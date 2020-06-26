package io.javaclasses.filehub.web;

import io.javaclasses.filehub.storage.UserStorage;

import static spark.Spark.*;

/**
 * The server that handles different HTTP requests.
 */
public class WebServer {

    /**
     * The FileHub application entry point. Registers routes to paths the server can handle.
     *
     * @param args The program command-line arguments.
     */
    public static void main(String[] args) {

        staticFileLocation("/ui-components");

        UserStorage userStorage = new UserStorage();

        path("/api", () -> {
            post("/register", new RegistrationRoute(userStorage));
        });
    }
}
