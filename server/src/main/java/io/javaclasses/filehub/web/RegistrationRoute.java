package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import io.javaclasses.filehub.api.PasswordValidationException;
import io.javaclasses.filehub.api.RegisterUser;
import io.javaclasses.filehub.api.Registration;
import io.javaclasses.filehub.api.UsernameValidationException;
import io.javaclasses.filehub.storage.UserStorage;
import spark.Request;
import spark.Response;
import spark.Route;

import static org.apache.commons.httpclient.HttpStatus.SC_OK;
import static org.apache.commons.httpclient.HttpStatus.SC_UNPROCESSABLE_ENTITY;

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

        this.userStorage = userStorage;
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

        response.type("application/json");

        GsonBuilder gsonBuilder = new GsonBuilder();

        gsonBuilder.registerTypeAdapter(RegisterUser.class, new RegisterUserDeserializer());
        gsonBuilder.registerTypeAdapter(UsernameValidationException.class, new UsernameValidationErrorSerializer());
        gsonBuilder.registerTypeAdapter(PasswordValidationException.class, new PasswordValidationErrorSerializer());

        Gson gson = gsonBuilder.create();

        RegisterUser command = gson.fromJson(request.body(), RegisterUser.class);
        Registration process = new Registration(userStorage);

        try {

            process.handle(command);

            response.status(SC_OK);
            return "The user is registered successfully.";

        } catch (UsernameValidationException error) {

            UsernameValidationException[] errors = {error};
            JsonElement json = gson.toJsonTree(errors);

            response.status(SC_UNPROCESSABLE_ENTITY);
            return json;
        }
    }
}
