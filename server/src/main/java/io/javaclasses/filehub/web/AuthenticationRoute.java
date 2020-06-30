package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
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
        if (logger.isInfoEnabled()) {
            logger.info("Received an '/api/login' request with body: {}", request.body());
        }

        response.type("application/json");

        AuthenticateUser command = gson.fromJson(request.body(), AuthenticateUser.class);
        if (logger.isDebugEnabled()) {
            logger.debug("AuthenticateUser command is parsed from request body: {}", command);
        }

        Authentication process = new Authentication(userStorage, tokenStorage);

        try {

            Token token = process.handle(command);
            if (logger.isDebugEnabled()) {
                logger.debug("The Authentication process handled the command successfully.");
            }

            response.status(SC_OK);
            return gson.toJson(token, Token.class);

        } catch (UsernameIsNotValidException exception) {

            if (logger.isDebugEnabled()) {
                logger.debug("A UsernameValidationException occurred: {}.", exception.toString());
            }

            UsernameIsNotValidException[] errors = {exception};
            JsonElement json = gson.toJsonTree(errors);
            if (logger.isDebugEnabled()) {
                logger.debug("JSON with validation error generated: {}", json);
            }

            response.status(SC_UNPROCESSABLE_ENTITY);
            return json;

        } catch (PasswordIsNotValidException exception) {

            if (logger.isDebugEnabled()) {
                logger.debug("A PasswordValidationException occurred: {}.", exception.toString());
            }

            PasswordIsNotValidException[] errors = {exception};
            JsonElement json = gson.toJsonTree(errors);
            if (logger.isDebugEnabled()) {
                logger.debug("JSON with validation error generated: {}", json);
            }

            response.status(SC_UNPROCESSABLE_ENTITY);
            return json;

        } catch (CredentialsAreNotValidException exception) {

            if (logger.isDebugEnabled()) {
                logger.debug("A CredentialsAreNotValidException occurred: {}", exception.toString());
            }

            response.status(SC_UNAUTHORIZED);
            return exception.getMessage();
        }
    }
}
