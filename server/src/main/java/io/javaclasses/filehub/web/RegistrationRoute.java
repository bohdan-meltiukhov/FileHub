package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import io.javaclasses.filehub.api.*;
import io.javaclasses.filehub.storage.UserStorage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.apache.http.HttpStatus.SC_OK;
import static org.apache.http.HttpStatus.SC_UNPROCESSABLE_ENTITY;

/**
 * The route for handling requests on the registration path.
 */
public class RegistrationRoute implements Route {

    /**
     * The storage with all registered users.
     */
    private final UserStorage userStorage;

    /**
     * Creates an instance of the registration route with set user storage.
     *
     * @param userStorage The storage with registered users.
     */
    public RegistrationRoute(UserStorage userStorage) {

        this.userStorage = checkNotNull(userStorage);
    }

    /**
     * Invoked when a request is made on the registration path.
     *
     * @param request  The request object providing information about the HTTP request.
     * @param response The response object providing functionality for modifying the response.
     * @return The content to be set in the response.
     */
    @Override
    public Object handle(Request request, Response response) {

        checkNotNull(request);
        checkNotNull(response);

        Logger logger = LoggerFactory.getLogger(RegistrationRoute.class);
        response.type("application/json");

        GsonBuilder gsonBuilder = new GsonBuilder();

        gsonBuilder.registerTypeAdapter(RegisterUser.class, new RegisterUserDeserializer());
        gsonBuilder.registerTypeAdapter(UsernameIsNotValidException.class, new UsernameIsNotValidErrorSerializer());
        gsonBuilder.registerTypeAdapter(PasswordIsNotValidException.class, new PasswordIsNotValidErrorSerializer());
        gsonBuilder.registerTypeAdapter(UsernameAlreadyTakenException.class,
                new UsernameAlreadyTakenExceptionSerializer());

        Gson gson = gsonBuilder.create();
        if (logger.isDebugEnabled()) {
            logger.debug("Gson object with custom type adapters created.");
        }

        RegisterUser command = gson.fromJson(request.body(), RegisterUser.class);
        if (logger.isDebugEnabled()) {
            logger.debug("RegisterUser command is parsed from request body.");
        }
        Registration process = new Registration(userStorage);
        if (logger.isDebugEnabled()) {
            logger.debug("Registration process created.");
        }

        try {

            process.handle(command);
            if (logger.isDebugEnabled()) {
                logger.debug("The process handled the command successfully.");
            }

            response.status(SC_OK);
            return "The user is registered successfully.";

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

        } catch (UsernameAlreadyTakenException exception) {

            if (logger.isDebugEnabled()) {
                logger.debug("A UsernameAlreadyTakenException occurred: {}", exception.toString());
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
