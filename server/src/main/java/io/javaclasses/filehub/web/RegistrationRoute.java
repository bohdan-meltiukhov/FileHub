package io.javaclasses.filehub.web;

import com.google.gson.*;
import io.javaclasses.filehub.api.*;
import io.javaclasses.filehub.storage.UserStorage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.apache.http.HttpStatus.*;

/**
 * The {@link Route} for handling requests on the registration path.
 */
public class RegistrationRoute implements Route {

    /**
     * The storage with all registered users.
     */
    private final UserStorage userStorage;

    /**
     * A utility for serializing and deserializing Java objects into JSON elements.
     */
    private final Gson gson;

    /**
     * Creates an instance of the registration route with set user storage.
     *
     * @param userStorage The storage with registered users.
     */
    public RegistrationRoute(UserStorage userStorage) {

        this.userStorage = checkNotNull(userStorage);

        GsonBuilder gsonBuilder = new GsonBuilder();

        gsonBuilder.registerTypeAdapter(RegisterUser.class, new RegisterUserDeserializer());
        gsonBuilder.registerTypeAdapter(UsernameIsNotValidException.class, new UsernameIsNotValidErrorSerializer());
        gsonBuilder.registerTypeAdapter(PasswordIsNotValidException.class, new PasswordIsNotValidErrorSerializer());
        gsonBuilder.registerTypeAdapter(UsernameAlreadyTakenException.class,
                new UsernameAlreadyTakenExceptionSerializer());

        gson = gsonBuilder.create();
    }

    /**
     * Handles the registration request.
     *
     * @param request  The request object providing information about the HTTP request.
     * @param response The response object providing functionality for modifying the response.
     * @return The content to be set in the response.
     */
    @Override
    public Object handle(Request request, Response response) {

        Logger logger = LoggerFactory.getLogger(RegistrationRoute.class);
        if (logger.isInfoEnabled()) {
            logger.info("Received an '/api/register' request with body: {}", request.body());
        }

        checkNotNull(request);
        checkNotNull(response);

        response.type("application/json");


        try {

            RegisterUser command = gson.fromJson(request.body(), RegisterUser.class);
            if (logger.isDebugEnabled()) {
                logger.debug("RegisterUser command is parsed from request body.");
            }
            Registration process = new Registration(userStorage);

            process.handle(command);
            if (logger.isDebugEnabled()) {
                logger.debug("The Registration process handled the command successfully.");
            }

            response.status(SC_OK);
            return "The user is registered successfully.";

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

        } catch (UsernameAlreadyTakenException exception) {

            if (logger.isInfoEnabled()) {
                logger.info("A UsernameAlreadyTakenException occurred: {}", exception.getMessage());
            }

            UsernameAlreadyTakenException[] errors = {exception};
            JsonElement json = gson.toJsonTree(errors);
            if (logger.isDebugEnabled()) {
                logger.debug("JSON with UsernameAlreadyTakenException generated: {}", json);
            }

            response.status(SC_UNPROCESSABLE_ENTITY);
            return json;
        }
    }
}
