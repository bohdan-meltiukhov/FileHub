package io.javaclasses.filehub.web;

import com.google.gson.*;
import io.javaclasses.filehub.api.*;
import io.javaclasses.filehub.storage.UserStorage;

import java.lang.reflect.Type;

import static org.apache.commons.httpclient.HttpStatus.SC_UNPROCESSABLE_ENTITY;
import static spark.Spark.*;

public class WebServer {

    public static void main(String[] args) {

        staticFileLocation("/ui-components");

        UserStorage userStorage = new UserStorage();

        path("/api", () -> {
            post("/register", (request, response) -> {

                response.type("application/json");
                Gson gson = new Gson();

                UserCredentials credentials = gson.fromJson(request.body(), UserCredentials.class);

                Username username = new Username(credentials.username);
                Password password = new Password(credentials.password);

                Registration process = new Registration(userStorage);

                try {

                    process.handle(new RegisterUser(username, password));

                } catch (ValidationError error) {

                    GsonBuilder gsonBuilder = new GsonBuilder();

                    gsonBuilder.registerTypeAdapter(ValidationError.class, new JsonSerializer<ValidationError>() {
                        @Override
                        public JsonElement serialize(ValidationError src, Type typeOfSrc,
                                                     JsonSerializationContext context) {

                            JsonObject jsonValidationError = new JsonObject();

                            jsonValidationError.addProperty("field", src.field());
                            jsonValidationError.addProperty("message", src.getMessage());

                            return jsonValidationError;
                        }
                    });

                    ValidationError[] errors = {error};
                    Gson errorGson = gsonBuilder.create();
                    JsonElement json = errorGson.toJsonTree(errors);

                    response.status(SC_UNPROCESSABLE_ENTITY);

                    return json;
                }

                response.status(200);

                return "The user is registered successfully.";
            });
        });
    }

    /**
     * The class that stores a pair of username and password.
     */
    private final static class UserCredentials {

        /**
         * The name of a user.
         */
        private final String username;

        /**
         * The password for the user's account.
         */
        private final String password;

        /**
         * Creates an instance of the user credentials class with set username and password.
         *
         * @param username The name of the user.
         * @param password The password for the user's account.
         */
        public UserCredentials(String username, String password) {

            this.username = username;
            this.password = password;
        }

        /**
         * Provides a string representation of the user credentials.
         *
         * @return A string representation of the user credentials that reflects the username and the password.
         */
        @Override
        public String toString() {

            return "UserCredentials{" +
                    "username='" + username + '\'' +
                    ", password='" + password + '\'' +
                    '}';
        }
    }
}
