package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import io.javaclasses.filehub.api.AccessForbiddenException;
import io.javaclasses.filehub.api.File;
import io.javaclasses.filehub.api.FileSize;
import io.javaclasses.filehub.api.FileSystemItemName;
import io.javaclasses.filehub.api.FileUpload;
import io.javaclasses.filehub.api.FolderNotFoundException;
import io.javaclasses.filehub.api.MimeType;
import io.javaclasses.filehub.api.UploadFile;
import io.javaclasses.filehub.storage.FileContentStorage;
import io.javaclasses.filehub.storage.FileId;
import io.javaclasses.filehub.storage.FileMetadataStorage;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import org.slf4j.Logger;
import spark.Request;
import spark.Response;
import spark.Route;

import javax.servlet.ServletException;
import javax.servlet.http.Part;
import java.io.IOException;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static io.javaclasses.filehub.api.MimeType.AUDIO;
import static io.javaclasses.filehub.api.MimeType.BOOK;
import static io.javaclasses.filehub.api.MimeType.IMAGE;
import static io.javaclasses.filehub.api.MimeType.OTHER;
import static io.javaclasses.filehub.api.MimeType.VIDEO;
import static org.apache.http.HttpStatus.SC_FORBIDDEN;
import static org.apache.http.HttpStatus.SC_NOT_FOUND;
import static org.apache.http.HttpStatus.SC_OK;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * A {@link Route} that handles an 'upload file' request.
 */
public class UploadFileRoute implements Route {

    /**
     * An slf4j logger.
     */
    private static final Logger logger = getLogger(UploadFileRoute.class);

    /**
     * A storage with folders.
     */
    private final FolderMetadataStorage folderStorage;

    /**
     * A storage with metadata information of files.
     */
    private final FileMetadataStorage fileMetadataStorage;

    /**
     * A storage with content of files.
     */
    private final FileContentStorage fileContentStorage;

    /**
     * A utility for turning Java {@link Object}s into {@link JsonElement}s.
     */
    private final Gson gson;

    /**
     * Creates an instance of the UploadFileRoute with given storage.
     *
     * @param folderStorage       A storage with folders.
     * @param fileMetadataStorage A storage with metadata information of files.
     * @param fileContentStorage  A storage with content of files.
     */
    public UploadFileRoute(FolderMetadataStorage folderStorage, FileMetadataStorage fileMetadataStorage,
                           FileContentStorage fileContentStorage) {

        this.folderStorage = checkNotNull(folderStorage);
        this.fileMetadataStorage = checkNotNull(fileMetadataStorage);
        this.fileContentStorage = checkNotNull(fileContentStorage);

        gson = createGson();
    }

    /**
     * Creates a {@link Gson} object with registered type adapters.
     *
     * @return The created Gson object.
     */
    private Gson createGson() {

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(File.class, new FileSerializer());
        return gsonBuilder.create();
    }

    /**
     * Handles an 'upload file' request and returns the created file.
     *
     * @param request  The request from a client.
     * @param response The object for modifying the response.
     * @return The response content.
     */
    @Override
    public Object handle(Request request, Response response) throws IOException, ServletException {

        UploadFile command = readCommand(request);
        if (logger.isDebugEnabled()) {
            logger.debug("Created an UploadFile command.");
        }
        FileUpload process = createProcess();
        if (logger.isDebugEnabled()) {
            logger.debug("Created a FileUpload process.");
        }

        try {

            File file = process.handle(command);
            if (logger.isDebugEnabled()) {
                logger.debug("The FileUpload process successfully handled the UploadFile command.");
            }

            return sendSuccessfulResponse(response, file);

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
     * Creates an {@link UploadFile} command from the given {@link Request}.
     *
     * @param request The request from the client.
     * @return The created command.
     */
    private static UploadFile readCommand(Request request) throws IOException, ServletException {

        Part uploadedFile = request.raw().getPart("file");

        FileId identifier = new FileId(generate());
        FileSystemItemName name = new FileSystemItemName(uploadedFile.getSubmittedFileName());
        MimeType mimeType = getMimeType(uploadedFile.getContentType());
        FileSize size = new FileSize(Math.toIntExact(uploadedFile.getSize()));
        FolderId parentFolderId = new FolderId(request.params("folderId"));

        File fileDto = new File(identifier, name, mimeType, size, parentFolderId);

        byte[] fileContent = uploadedFile.getInputStream().readAllBytes();

        return new UploadFile(parentFolderId, fileDto, fileContent);
    }

    /**
     * Provides a mime type that corresponds to the given content type.
     *
     * @param contentType The content type of a file.
     * @return The matching mime type.
     */
    private static MimeType getMimeType(String contentType) {

        if (contentType.equals("application/pdf") || contentType.equals("image/vnd.djvu")) {

            return BOOK;
        }
        if (contentType.startsWith("image")) {

            return IMAGE;
        }
        if (contentType.startsWith("video")) {

            return VIDEO;
        }
        if (contentType.startsWith("audio")) {

            return AUDIO;
        }
        return OTHER;
    }

    /**
     * Creates an instance of the FileUpload process.
     *
     * @return The created FileUpload process.
     */
    private FileUpload createProcess() {

        return new FileUpload(folderStorage, fileMetadataStorage, fileContentStorage);
    }

    /**
     * Sets a successful response status code and generates the response content.
     *
     * @param response The object for modifying the response.
     * @param file     The file to send in response body.
     * @return The response body.
     */
    private String sendSuccessfulResponse(Response response, File file) {

        response.status(SC_OK);
        return gson.toJson(file, File.class);
    }
}
