package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.FileContentRecord;
import io.javaclasses.filehub.storage.FileContentStorage;
import io.javaclasses.filehub.storage.FileId;
import io.javaclasses.filehub.storage.FileMetadataRecord;
import io.javaclasses.filehub.storage.FileMetadataStorage;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import org.slf4j.Logger;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.File.fromFileMetadataRecord;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static java.lang.String.format;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * An {@link ApplicationProcess} that handles the {@link UploadFile} command.
 */
@Immutable
public class FileUpload implements ApplicationProcess<UploadFile, File> {

    /**
     * An slf4j logger.
     */
    private static final Logger logger = getLogger(FileUpload.class);

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
     * Creates an instance of the FileUpload process with set storage.
     *
     * @param fileMetadataStorage A storage with metadata information of files.
     * @param fileContentStorage  A storage with content of files.
     */
    public FileUpload(FolderMetadataStorage folderStorage, FileMetadataStorage fileMetadataStorage,
                      FileContentStorage fileContentStorage) {

        this.folderStorage = checkNotNull(folderStorage);
        this.fileMetadataStorage = checkNotNull(fileMetadataStorage);
        this.fileContentStorage = checkNotNull(fileContentStorage);
    }

    /**
     * Saves a file from the given {@link UploadFile} command to the storage.
     *
     * @param command The command to upload a file.
     * @return The saved file.
     */
    @Override
    public File handle(UploadFile command) {

        checkNotNull(command);
        if (logger.isInfoEnabled()) {
            logger.info("Starting the UploadFile process.");
        }

        FolderMetadataRecord parentFolder = findFolder(command.folderId());
        verifyFolderOwnership(parentFolder, command.currentUser());

        FileMetadataRecord fileMetadataRecord = createFileMetadataRecord(command.file(), command.currentUser().id());
        saveFileMetadataRecord(fileMetadataRecord);
        if (logger.isDebugEnabled()) {
            logger.debug("Created and saved a file metadata record: {}", fileMetadataRecord);
        }

        FileContentRecord fileContentRecord = createFileContentRecord(fileMetadataRecord.id(), command.fileContent());
        saveFileContentRecord(fileContentRecord);
        if (logger.isDebugEnabled()) {
            logger.debug("Created an saved a file content record: {}", fileContentRecord);
        }

        if (logger.isInfoEnabled()) {
            logger.info("Successfully finished the FileUpload process.");
        }

        return fromFileMetadataRecord(fileMetadataRecord);
    }

    /**
     * Finds a folder in the {@link FolderMetadataStorage}.
     *
     * @param folderId An identifier of the required folder.
     * @return The found folder.
     * @throws FolderNotFoundException in case the folder is not found.
     */
    private FolderMetadataRecord findFolder(FolderId folderId) {

        FolderMetadataRecord folder = folderStorage.get(folderId);
        if (folder == null) {

            if (logger.isDebugEnabled()) {
                logger.debug("The folder with identifier {} is not found.", folderId.value());
            }
            throw new FolderNotFoundException("Folder not found.");
        }

        if (logger.isDebugEnabled()) {
            logger.debug("Found a folder {}", folder);
        }

        return folder;
    }

    /**
     * Checks whether the provided {@link FolderMetadataRecord} belongs to the given {@link UserRecord}.
     *
     * @param folder     The {@link FolderMetadataRecord} to check.
     * @param userRecord The {@link UserRecord} that wants to access the folder.
     * @throws AccessForbiddenException In case the provided user is not allowed to access the folder.
     */
    private static void verifyFolderOwnership(FolderMetadataRecord folder, UserRecord userRecord) {

        if (!folder.userId().equals(userRecord.id())) {

            throw new AccessForbiddenException(format("User with identifier %s is not the owner of the folder %s.",
                    userRecord.id(), folder.id()));
        }
        if (logger.isDebugEnabled()) {
            logger.debug("The user {} is the owner of the folder with identifier {}.", userRecord.username(),
                    folder.id());
        }
    }

    /**
     * Creates a {@link FileMetadataRecord} from a {@link File} object.
     *
     * @param file    A file data transfer object.
     * @param ownerId An identifier of the file owner.
     * @return The created {@link FileMetadataRecord}.
     */
    private static FileMetadataRecord createFileMetadataRecord(File file, UserId ownerId) {

        FileId identifier = file.fileId();
        FileSystemItemName name = file.filename();
        MimeType mimeType = file.mimeType();
        FileSize size = file.fileSize();
        FolderId parentFolderId = file.parentFolderId();

        return new FileMetadataRecord(identifier, name, mimeType, size, ownerId, parentFolderId);
    }

    /**
     * Saves a {@link FileMetadataRecord} to the {@link FileMetadataStorage}.
     *
     * @param record The record to be saved.
     */
    private void saveFileMetadataRecord(FileMetadataRecord record) {

        fileMetadataStorage.put(record);
    }

    /**
     * Creates a {@link FileContentRecord} with the specified content.
     *
     * @param fileId      An identifier of the file.
     * @param fileContent A content of the file.
     * @return The created {@link FileContentRecord}.
     */
    private static FileContentRecord createFileContentRecord(FileId fileId, byte[] fileContent) {

        return new FileContentRecord(fileId, fileContent);
    }

    /**
     * Saves a {@link FileContentRecord} to the {@link FileContentStorage}.
     *
     * @param record The record to be saved.
     */
    private void saveFileContentRecord(FileContentRecord record) {

        fileContentStorage.put(record);
    }
}
