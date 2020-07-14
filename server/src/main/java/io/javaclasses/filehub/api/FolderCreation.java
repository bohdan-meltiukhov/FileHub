package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import org.slf4j.Logger;

import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.Folder.fromFolderMetadataRecord;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static java.lang.String.format;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * An {@link ApplicationProcess} that handles a {@link CreateFolder} command.
 */
public class FolderCreation implements ApplicationProcess<CreateFolder, Folder> {

    /**
     * An slf4j logger.
     */
    private static final Logger logger = getLogger(FolderCreation.class);

    /**
     * A storage with folders.
     */
    private final FolderMetadataStorage folderStorage;

    /**
     * Creates an instance of the FolderCreation process.
     *
     * @param folderStorage A storage with folders.
     */
    public FolderCreation(FolderMetadataStorage folderStorage) {

        this.folderStorage = checkNotNull(folderStorage);
    }

    /**
     * Creates a {@link FolderMetadataRecord} and saves it ot the {@link FolderMetadataStorage}.
     *
     * @param command The command to create a folder.
     * @return The data transfer object of the created folder.
     */
    @Override
    public Folder handle(CreateFolder command) {

        checkNotNull(command);
        if (logger.isDebugEnabled()) {
            logger.debug("Starting the FolderCreation process.");
        }

        FolderMetadataRecord parentFolder = findParentFolder(command.parentFolderId());
        verifyFolderOwnership(parentFolder, command.currentUser());

        FolderMetadataRecord newFolder = createFolder(parentFolder);
        saveFolder(newFolder);

        return fromFolderMetadataRecord(newFolder);
    }

    /**
     * Finds a folder in the {@link FolderMetadataStorage}.
     *
     * @param folderId An identifier of the required folder.
     * @return The found folder.
     * @throws FolderNotFoundException in case the folder is not found.
     */
    private FolderMetadataRecord findParentFolder(FolderId folderId) {

        FolderMetadataRecord folder = folderStorage.get(folderId);
        if (folder == null) {

            if (logger.isDebugEnabled()) {
                logger.debug("The folder with identifier {} is not found.", folderId.value());
            }
            throw new FolderNotFoundException("Folder not found.");
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
    private void verifyFolderOwnership(FolderMetadataRecord folder, UserRecord userRecord) {

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
     * Creates a folder with the specified parent.
     *
     * @param parentFolder The parent folder.
     * @return The created folder.
     */
    private FolderMetadataRecord createFolder(FolderMetadataRecord parentFolder) {

        FolderId folderId = new FolderId(generate());
        UserId userId = parentFolder.userId();
        FileSystemItemName folderName = generateNewFolderName(parentFolder.id());
        FolderId parentFolderId = parentFolder.id();

        return new FolderMetadataRecord(folderId, userId, folderName, parentFolderId);
    }

    /**
     * Creates a name for a new folder.
     *
     * <p>The default name is "New name". In case such name already exists, adds a number in brackets
     * (e.g. "New folder (2)", "New folder (3)", and so on).
     *
     * @param parentFolderId An identifier of the parent folder.
     * @return The new folder name.
     */
    private FileSystemItemName generateNewFolderName(FolderId parentFolderId) {

        List<FileSystemItemName> childFolderNames = folderStorage.getChildFolders(parentFolderId).stream()
                .map(FolderMetadataRecord::folderName)
                .collect(Collectors.toList());

        FileSystemItemName name = new FileSystemItemName("New Folder");
        if (childFolderNames.contains(name)) {
            for (int i = 2; ; i++) {
                FileSystemItemName nextName = new FileSystemItemName(format("New folder (%d)", i));
                if (!childFolderNames.contains(nextName)) {
                    name = nextName;
                    break;
                }
            }
        }

        return name;
    }

    /**
     * Saves the provided folder in the {@link FolderMetadataStorage}.
     *
     * @param folder The folder to save.
     */
    private void saveFolder(FolderMetadataRecord folder) {

        folderStorage.put(folder);
    }
}
