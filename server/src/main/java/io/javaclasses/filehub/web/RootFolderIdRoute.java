package io.javaclasses.filehub.web;

import io.javaclasses.filehub.api.GetRootFolderId;
import io.javaclasses.filehub.api.RootFolderIdView;
import io.javaclasses.filehub.api.UnauthorizedException;
import io.javaclasses.filehub.storage.FolderId;
import org.slf4j.Logger;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.apache.http.HttpStatus.SC_OK;
import static org.apache.http.HttpStatus.SC_UNAUTHORIZED;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * A {@link Route} that handles the get-root-folder-id request.
 *
 * <p>Provides the identifier of the root folder of the current user.
 *
 * <p>The root folder is the "highest" directory in the hierarchy.
 */
public class RootFolderIdRoute implements Route {

    /**
     * An slf4j logger.
     */
    private static final Logger logger = getLogger(RootFolderIdRoute.class);

    /**
     * Handles the get root folder identifier request.
     *
     * @param request  The request from the client.
     * @param response The object for creating the response.
     * @return The response content.
     */
    @Override
    public Object handle(Request request, Response response) {

        checkNotNull(request);
        checkNotNull(response);

        try {

            GetRootFolderId command = createCommand();

            if (logger.isDebugEnabled()) {
                logger.debug("Created a command {}.", command);
            }

            RootFolderIdView view = createView();
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

    /**
     * Creates a GetRootFolderId command.
     *
     * @return The created command.
     */
    private GetRootFolderId createCommand() {

        return new GetRootFolderId();
    }

    /**
     * Creates a RootFolderIdView.
     *
     * @return The created view.
     */
    private RootFolderIdView createView() {

        return new RootFolderIdView();
    }
}
