package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javaclasses.filehub.api.AccessForbiddenException;
import io.javaclasses.filehub.api.File;
import io.javaclasses.filehub.api.Folder;
import io.javaclasses.filehub.api.FolderContent;
import io.javaclasses.filehub.api.FolderContentView;
import io.javaclasses.filehub.api.GetFolderContent;
import io.javaclasses.filehub.api.NotFoundException;
import io.javaclasses.filehub.storage.FileMetadataRecord;
import io.javaclasses.filehub.storage.FileMetadataStorage;
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
 * A {@link Route} that handles a get-folder-content request.
 */
public class GetFolderContentRoute implements Route {

    /**
     * An slf4j logger.
     */
    private static final Logger logger = getLogger(GetFolderContentRoute.class);

    /**
     * A storage with {@link FolderMetadataRecord}s.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * A storage with {@link FileMetadataRecord}s.
     */
    private final FileMetadataStorage fileMetadataStorage;

    /**
     * A utility for serializing Java {@link Object}s into {@link com.google.gson.JsonElement}s.
     */
    private final Gson gson;

    /**
     * Creates an instance of the {@link GetFolderContentRoute} with set storages.
     *
     * @param folderMetadataStorage A storage with folders.
     * @param fileMetadataStorage   A storage with files.
     */
    public GetFolderContentRoute(FolderMetadataStorage folderMetadataStorage, FileMetadataStorage fileMetadataStorage) {

        this.fileMetadataStorage = checkNotNull(fileMetadataStorage);
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);

        gson = createGson();
    }

    /**
     * Creates a Gson object.
     *
     * @return The created Gson object.
     */
    private Gson createGson() {

        GsonBuilder gsonBuilder = new GsonBuilder();

        gsonBuilder.registerTypeAdapter(FolderContent.class, new FolderContentSerializer());
        gsonBuilder.registerTypeAdapter(Folder.class, new FolderSerializer());
        gsonBuilder.registerTypeAdapter(File.class, new FileSerializer());

        return gsonBuilder.create();
    }

    /**
     * Handles a get folder content request and provides the content of the required folder.
     *
     * @param request  The request from the client.
     * @param response The object for modifying the response.
     * @return The response content.
     */
    @Override
    public Object handle(Request request, Response response) {

        GetFolderContent query = readQuery(request);
        if (logger.isDebugEnabled()) {
            logger.debug("Created a query: {}", query);
        }
        FolderContentView view = createView();
        if (logger.isDebugEnabled()) {
            logger.debug("Created a FolderContentView view.");
        }

        try {

            FolderContent folderContent = view.process(query);
            gson.toJson(folderContent, FolderContent.class);

            response.status(SC_OK);
            return generateResponse(folderContent);

        } catch (NotFoundException exception) {

            response.status(SC_NOT_FOUND);
            return exception.getMessage();

        } catch (AccessForbiddenException exception) {

            response.status(SC_FORBIDDEN);
            return exception.getMessage();
        }
    }

    /**
     * Gets a {@link GetFolderContent} query from the provided {@link Request}.
     *
     * @param request The request from the client.
     * @return The created {@link GetFolderContent} query.
     */
    private GetFolderContent readQuery(Request request) {

        FolderId folderId = new FolderId(request.params(":folderId"));
        return new GetFolderContent(folderId);
    }

    /**
     * Creates a {@link FolderContentView} instance.
     *
     * @return The created view.
     */
    private FolderContentView createView() {

        return new FolderContentView(folderMetadataStorage, fileMetadataStorage);
    }

    /**
     * Generates a response with a folder content.
     *
     * @param folderContent The {@link FolderContent} object to send.
     * @return The generated response.
     */
    private String generateResponse(FolderContent folderContent) {

        return gson.toJson(folderContent, FolderContent.class);
    }
}
