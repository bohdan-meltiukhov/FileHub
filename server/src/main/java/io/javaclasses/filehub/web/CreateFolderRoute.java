package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import io.javaclasses.filehub.api.AccessForbiddenException;
import io.javaclasses.filehub.api.CreateFolder;
import io.javaclasses.filehub.api.Folder;
import io.javaclasses.filehub.api.FolderCreation;
import io.javaclasses.filehub.api.NotFoundException;
import io.javaclasses.filehub.storage.FolderId;
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
 * A {@link Route} that handles a crete folder request.
 */
public class CreateFolderRoute implements Route {

    /**
     * An slf4j logger.
     */
    private static final Logger logger = getLogger(CreateFolderRoute.class);

    /**
     * A storage with folders.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * A utility for turning Java {@link Object}s into {@link JsonElement}s.
     */
    private final Gson gson;

    /**
     * Creates an instance of the CreateFolderRoute.
     *
     * @param folderMetadataStorage The storage with folders.
     */
    public CreateFolderRoute(FolderMetadataStorage folderMetadataStorage) {

        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);

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
     * Handles a create folder request and returns the created folder.
     *
     * @param request  The request from the client.
     * @param response The object for modifying the response.
     * @return The response content.
     */
    @Override
    public Object handle(Request request, Response response) {

        CreateFolder command = readCommand(request);
        if (logger.isDebugEnabled()) {
            logger.debug("Read a CreateFolder command: {}", command);
        }

        FolderCreation process = createProcess();
        if (logger.isDebugEnabled()) {
            logger.debug("Created a FolderCreation process.");
        }

        try {

            Folder folder = process.handle(command);
            return setSuccessfulResponse(response, folder);

        } catch (NotFoundException exception) {

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
     * Parses a {@link CreateFolder} command from the provided {@link Request}.
     *
     * @param request The request from the client.
     * @return The created command.
     */
    private CreateFolder readCommand(Request request) {

        FolderId parentFolderId = new FolderId(request.params(":folderId"));
        return new CreateFolder(parentFolderId);
    }

    /**
     * Creates an instance of the {@link FolderCreation} process.
     *
     * @return The created process.
     */
    private FolderCreation createProcess() {

        return new FolderCreation(folderMetadataStorage);
    }

    /**
     * Sets a successful response status and generates the response content.
     *
     * @param response The object for modifying the response.
     * @param folder   The folder to send in response.
     * @return The response content.
     */
    private String setSuccessfulResponse(Response response, Folder folder) {

        response.status(SC_OK);
        return gson.toJson(folder, Folder.class);
    }
}
