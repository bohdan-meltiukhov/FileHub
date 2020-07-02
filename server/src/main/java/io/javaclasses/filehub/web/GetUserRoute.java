package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javaclasses.filehub.api.GetUser;
import io.javaclasses.filehub.api.GettingUser;
import io.javaclasses.filehub.api.Token;
import io.javaclasses.filehub.api.UnauthorizedException;
import io.javaclasses.filehub.storage.TokenStorage;
import io.javaclasses.filehub.storage.UserRecord;
import io.javaclasses.filehub.storage.UserStorage;
import org.slf4j.Logger;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.apache.http.HttpStatus.SC_OK;
import static org.apache.http.HttpStatus.SC_UNAUTHORIZED;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * A {@link Route} that handles a get user request.
 */
public class GetUserRoute implements Route {

    /**
     * A storage with all tokens.
     */
    private final TokenStorage tokenStorage;

    /**
     * A storage with all registered users.
     */
    private final UserStorage userStorage;

    /**
     * A utility for serializing and deserializing Java objects into JSON.
     */
    private final Gson gson;

    /**
     * Creates an instance of the RootFolderIdRoute with set token and user storage.
     *
     * @param tokenStorage A storage with all tokens.
     * @param userStorage  A storage with all users.
     */
    public GetUserRoute(TokenStorage tokenStorage, UserStorage userStorage) {

        this.tokenStorage = checkNotNull(tokenStorage);
        this.userStorage = checkNotNull(userStorage);

        gson = createGson();
    }

    private Gson createGson() {

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(UserRecord.class, new UserRecordSerializer());
        return gsonBuilder.create();
    }

    /**
     * Provides the current user.
     *
     * @param request The request from the client.
     * @param response The object for modifying the response
     * @return The content to be set in the response
     */
    @Override
    public Object handle(Request request, Response response) {

        checkNotNull(request);
        checkNotNull(response);

        Logger logger = getLogger(RootFolderIdRoute.class);

        try {

            Token token = new Token(request.headers("Authentication"));
            if (logger.isDebugEnabled()) {
                logger.debug("Received a '{}' request with token {}.", request.matchedPath(), token);
            }

            GetUser command = new GetUser(token);

            if (logger.isDebugEnabled()) {
                logger.debug("Created a command {}.", command);
            }

            GettingUser process = new GettingUser(tokenStorage, userStorage);
            UserRecord userRecord = process.handle(command);

            if (logger.isDebugEnabled()) {
                logger.debug("The process handled the command successfully. User record: {}", userRecord);
            }

            response.status(SC_OK);
            return gson.toJson(userRecord, UserRecord.class);

        } catch (UnauthorizedException exception) {

            if (logger.isDebugEnabled()) {
                logger.debug("An {} exception occurred: {}", exception.getClass().getSimpleName(),
                        exception.getMessage());
            }

            response.status(SC_UNAUTHORIZED);
            return exception.getMessage();
        }
    }
}
