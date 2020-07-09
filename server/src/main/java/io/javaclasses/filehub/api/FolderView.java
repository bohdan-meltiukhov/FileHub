package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import io.javaclasses.filehub.storage.UserRecord;
import org.slf4j.Logger;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * A {@link View} that processes a {@link GetFolder} query.
 */
public class FolderView implements View<GetFolder, Folder> {

    /**
     * An slf4j logger.
     */
    private static final Logger logger = getLogger(FolderView.class);

    /**
     * A storage with {@link FolderMetadataRecord}s.
     */
    private final FolderMetadataStorage folderStorage;

    /**
     * Creates a FolderView instance.
     *
     * @param folderStorage A storage with {@link FolderMetadataRecord}s.
     */
    public FolderView(FolderMetadataStorage folderStorage) {

        this.folderStorage = checkNotNull(folderStorage);
    }

    /**
     * Processes a {@link GetFolder} query and provided the required {@link Folder}.
     *
     * @param query The query from a client.
     * @return The desired {@link Folder}.
     */
    @Override
    public Folder process(GetFolder query) {

        checkNotNull(query);

        if (logger.isDebugEnabled()) {
            logger.debug("Starting the FolderView.");
        }

        FolderMetadataRecord folderRecord = findFolderMetadataRecord(query.folderId());
        if (logger.isDebugEnabled()) {
            logger.debug("Found a folder: {}", folderRecord);
        }

        checkFolderOwner(folderRecord, query.currentUser());

        return createFolderDto(folderRecord);
    }

    /**
     * Finds a {@link FolderMetadataRecord} in the {@link FolderMetadataStorage}.
     *
     * @param folderId An identifier of the required folder.
     * @return The found folder.
     * @throws NotFoundException in case the necessary folder is not found.
     */
    private FolderMetadataRecord findFolderMetadataRecord(FolderId folderId) {

        FolderMetadataRecord folder = folderStorage.get(folderId);
        if (folder == null) {

            throw new NotFoundException("The folder is not found.");
        }
        return folder;
    }

    /**
     * Checks whether the provided {@link FolderMetadataRecord} belongs to the provided {@link UserRecord}.
     *
     * @param folder     The {@link FolderMetadataRecord} to check.
     * @param userRecord The {@link UserRecord} that wants to access the folder.
     * @throws AccessForbiddenException In case the provided user is not allowed to access the folder.
     */
    private void checkFolderOwner(FolderMetadataRecord folder, UserRecord userRecord) {

        if (!folder.userId().equals(userRecord.id())) {

            throw new AccessForbiddenException("Unfortunately, you are not allowed to access this folder.");
        }
        if (logger.isDebugEnabled()) {
            logger.debug("The current user {} can access the folder.", userRecord.username());
        }
    }

    /**
     * Creates a {@link Folder} from a {@link FolderMetadataRecord}.
     *
     * @param folderRecord A {@link FolderMetadataRecord} to create from.
     * @return The created {@link Folder}.
     */
    private Folder createFolderDto(FolderMetadataRecord folderRecord) {

        return Folder.fromFolderMetadataRecord(folderRecord);
    }
}
