package io.javaclasses.filehub.web;

import io.javaclasses.filehub.storage.UserStorage;

import static spark.Spark.*;

/**
 * The server that handles different HTTP requests.
 */
public class WebApplication {

    /**
     * Starts the FileHub web server.
     *
     * <p>Initializes necessary storage and registers routes to paths the server can handle.
     *
     * <p>The application uses the Spark framework to run the server.
     */
    public void start() {

        staticFileLocation("/ui-components");

        UserStorage userStorage = new UserStorage();

        path("/api", () -> {
            post("/register", new RegistrationRoute(userStorage));
        });
    }

    /**
     * Boots the FileHub web application.
     *
     * @param args The program command-line arguments.
     */
    public static void main(String[] args) {

        WebApplication application = new WebApplication();
        application.start();
    }
}
