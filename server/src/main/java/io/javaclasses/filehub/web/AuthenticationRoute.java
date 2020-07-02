package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonParseException;
import io.javaclasses.filehub.api.*;
import io.javaclasses.filehub.storage.TokenStorage;
import io.javaclasses.filehub.storage.UserStorage;
import org.slf4j.Logger;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.apache.http.HttpStatus.*;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * A {@link Route} that handles the authentication request.
 */
public class AuthenticationRoute implements Route {

    /**
     * A storage with all registered users.
     */
    private final UserStorage userStorage;

    /**
     * A storage with all created authentication tokens.
     */
    private final TokenStorage tokenStorage;

    /**
     * A utility to serialize and deserialize Java objects into JSON elements.
     */
    private final Gson gson;

    /**
     * Creates an instance of the Authentication route with set user and token storage.
     *
     * @param userStorage  A storage with all application users.
     * @param tokenStorage A storage with all authentication tokens.
     */
    public AuthenticationRoute(UserStorage userStorage, TokenStorage tokenStorage) {

        this.userStorage = checkNotNull(userStorage);
        this.tokenStorage = checkNotNull(tokenStorage);

        GsonBuilder gsonBuilder = new GsonBuilder();

        gsonBuilder.registerTypeAdapter(AuthenticateUser.class, new AuthenticateUserDeserializer());
        gsonBuilder.registerTypeAdapter(UsernameIsNotValidException.class, new UsernameIsNotValidErrorSerializer());
        gsonBuilder.registerTypeAdapter(PasswordIsNotValidException.class, new PasswordIsNotValidErrorSerializer());
        gsonBuilder.registerTypeAdapter(Token.class, new TokenSerializer());

        gson = gsonBuilder.create();
    }

    /**
     * Handles the authentication request.
     *
     * @param request  The request from the client.
     * @param response The server response.
     * @return The response body.
     */
    @Override
    public Object handle(Request request, Response response) {

        checkNotNull(request);
        checkNotNull(response);

        Logger logger = getLogger(AuthenticationRoute.class);
        if (logger.isDebugEnabled()) {
            logger.debug("Received a '{}' request with body: {}", request.matchedPath(), request.body());
        }

        response.type("application/json");

        Authentication process = new Authentication(userStorage, tokenStorage);

        try {

            AuthenticateUser command = gson.fromJson(request.body(), AuthenticateUser.class);
            if (logger.isDebugEnabled()) {
                logger.debug("AuthenticateUser command is parsed from request body: {}", command);
            }

            Token token = process.handle(command);
            if (logger.isDebugEnabled()) {
                logger.debug("The Authentication process handled the command successfully.");
            }

            response.status(SC_OK);
            return gson.toJson(token, Token.class);

        } catch (JsonParseException exception) {

            if (logger.isInfoEnabled()) {
                logger.info("A JsonParseException occurred: {}", exception.getMessage());
            }

            response.status(SC_BAD_REQUEST);
            return "Unfortunately, we didn't manage to recognize the request.";

        } catch (UsernameIsNotValidException | PasswordIsNotValidException exception) {

            if (logger.isInfoEnabled()) {
                logger.info("A {} occurred: {}.", exception.getClass().getSimpleName(), exception.getMessage());
            }

            JsonArray errors = new JsonArray();
            errors.add(gson.toJsonTree(exception));
            if (logger.isDebugEnabled()) {
                logger.debug("JSON with validation error generated: {}", errors);
            }

            response.status(SC_UNPROCESSABLE_ENTITY);
            return errors;

        } catch (UnauthorizedException exception) {

            if (logger.isDebugEnabled()) {
                logger.debug("An UnauthorizedException occurred: {}", exception.getMessage());
            }

            response.status(SC_UNAUTHORIZED);
            return exception.getMessage();
        }
    }
}
