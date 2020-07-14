package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import io.javaclasses.filehub.api.AccessForbiddenException;
import io.javaclasses.filehub.api.Folder;
import io.javaclasses.filehub.api.FolderView;
import io.javaclasses.filehub.api.GetFolder;
import io.javaclasses.filehub.api.FolderNotFoundException;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import org.slf4j.Logger;
import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.apache.http.HttpStatus.SC_FORBIDDEN;
import static org.apache.http.HttpStatus.SC_NOT_FOUND;
import static org.apache.http.HttpStatus.SC_OK;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * A {@link Route} that handles a get folder request.
 */
public class GetFolderRoute implements Route {

    /**
     * An slf4j logger.
     */
    private static final Logger logger = getLogger(GetFolderRoute.class);

    /**
     * A storage with {@link FolderMetadataRecord}s.
     */
    private final FolderMetadataStorage folderStorage;

    /**
     * A utility for turning Java objects into {@link JsonElement}s.
     */
    private final Gson gson;

    /**
     * Creates an instance of the GetFolder route.
     *
     * @param folderStorage A storage with folder metadata records.
     */
    public GetFolderRoute(FolderMetadataStorage folderStorage) {

        this.folderStorage = checkNotNull(folderStorage);

        gson = createGson();
    }

    /**
     * Creates a {@link Gson} object with registered type adapters.
     *
     * @return The created Gson object.
     */
    private Gson createGson() {

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(Folder.class, new FolderSerializer());
        return gsonBuilder.create();
    }

    /**
     * Handles a get folder request and returns the required folder.
     *
     * @param request  The request from the client.
     * @param response The object for modifying the response.
     * @return The response content.
     */
    @Override
    public Object handle(Request request, Response response) {

        GetFolder query = readQuery(request);
        if (logger.isDebugEnabled()) {
            logger.debug("Created a query: {}", query);
        }

        FolderView view = createView();
        if (logger.isDebugEnabled()) {
            logger.debug("Created a FolderView");
        }

        try {

            Folder folder = view.process(query);
            if (logger.isDebugEnabled()) {
                logger.debug("The FolderView returned a Folder: {}", folder);
            }

            return sendSuccessfulResponse(response, folder);

        } catch (FolderNotFoundException exception) {

            if (logger.isDebugEnabled()) {
                logger.debug("A {} exception occurred: {}", exception.getClass().getSimpleName(), exception);
            }
            response.status(SC_NOT_FOUND);
            return exception.getMessage();

        } catch (AccessForbiddenException exception) {

            if (logger.isDebugEnabled()) {
                logger.debug("A {} exception occurred: {}", exception.getClass().getSimpleName(), exception);
            }
            response.status(SC_FORBIDDEN);
            return exception.getMessage();
        }
    }

    /**
     * Reads a {@link GetFolder} query from a {@link Request}.
     *
     * @param request The request from the client.
     * @return The created GetFolder query.
     */
    private GetFolder readQuery(Request request) {

        FolderId folderId = new FolderId(request.params(":folderId"));
        return new GetFolder(folderId);
    }

    /**
     * Creates a {@link FolderView} instance.
     *
     * @return The created view.
     */
    private FolderView createView() {

        return new FolderView(folderStorage);
    }

    /**
     * Sets a successful response status and provides the response body.
     *
     * @param response The object for modifying the response.
     * @param folder   The folder to send in the response.
     * @return The response body.
     */
    private String sendSuccessfulResponse(Response response, Folder folder) {

        response.status(SC_OK);
        return gson.toJson(folder, Folder.class);
    }
}
