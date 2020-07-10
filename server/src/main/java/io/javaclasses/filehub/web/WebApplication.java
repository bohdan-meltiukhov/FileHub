package io.javaclasses.filehub.web;

import io.javaclasses.filehub.api.CurrentUser;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import io.javaclasses.filehub.storage.LoggedInUserStorage;
import io.javaclasses.filehub.storage.UserStorage;
import spark.Filter;

import static spark.Spark.after;
import static spark.Spark.before;
import static spark.Spark.get;
import static spark.Spark.path;
import static spark.Spark.post;
import static spark.Spark.staticFileLocation;

/**
 * The FileHub web application. Initializes {@link io.javaclasses.filehub.storage.Storage} and starts the server.
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
        LoggedInUserStorage loggedInUserStorage = new LoggedInUserStorage();
        FolderMetadataStorage folderStorage = new FolderMetadataStorage();

        Filter filter = new UserAuthenticationFilter(loggedInUserStorage, userStorage);
        Filter logRequestDataFilter = new LogRequestDataFilter();

        before("/api/*", logRequestDataFilter);

        path("/api", () -> {

            post("/register", new RegistrationRoute(userStorage, folderStorage));
            post("/login", new AuthenticationRoute(userStorage, loggedInUserStorage));

            before("/root-folder", filter);
            get("/root-folder", new RootFolderIdRoute());

            before("/user", filter);
            get("/user", new GetUserRoute());

            after((request, response) -> CurrentUser.clear());
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
