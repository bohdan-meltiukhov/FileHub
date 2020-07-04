package io.javaclasses.filehub.web;

import io.javaclasses.filehub.api.GetRootFolderId;
import io.javaclasses.filehub.api.RootFolderIdView;
import io.javaclasses.filehub.api.Token;
import io.javaclasses.filehub.api.UnauthorizedException;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.TokenStorage;
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
 * A {@link Route} that provides the identifier of the root folder.
 */
public class RootFolderIdRoute implements Route {

    /**
     * A storage with all tokens.
     */
    private final TokenStorage tokenStorage;

    /**
     * A storage with all registered users.
     */
    private final UserStorage userStorage;

    /**
     * Creates an instance of the RootFolderIdRoute with set token and user storage.
     *
     * @param tokenStorage A storage with all tokens.
     * @param userStorage  A storage with all users.
     */
    public RootFolderIdRoute(TokenStorage tokenStorage, UserStorage userStorage) {

        this.tokenStorage = checkNotNull(tokenStorage);
        this.userStorage = checkNotNull(userStorage);
    }

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

            GetRootFolderId command = new GetRootFolderId(token);

            if (logger.isDebugEnabled()) {
                logger.debug("Created a command {}.", command);
            }

            RootFolderIdView view = new RootFolderIdView(tokenStorage, userStorage);
            FolderId folderId = view.process(command);

            if (logger.isDebugEnabled()) {
                logger.debug("The view handled the command successfully. Folder ID: {}", folderId);
            }

            response.status(SC_OK);
            return folderId.value();

        } catch (UnauthorizedException exception) {

            if (logger.isDebugEnabled()) {
                logger.debug("An UnauthorizedException exception occurred: {}", exception.getMessage());
            }

            response.status(SC_UNAUTHORIZED);
            return exception.getMessage();
        }
    }
}
