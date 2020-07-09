package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FileMetadataStorage;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import io.javaclasses.filehub.storage.UserRecord;
import org.slf4j.Logger;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * A {@link View} that processes the {@link GetFolderContent} query.
 */
public class FolderContentView implements View<GetFolderContent, FolderContent> {

    /**
     * An sfl4j logger.
     */
    private static final Logger logger = getLogger(FolderContentView.class);

    /**
     * A storage with folders.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * A storage with files.
     */
    private final FileMetadataStorage fileMetadataStorage;

    /**
     * Creates a {@link FolderContentView} instance.
     *
     * @param folderMetadataStorage A storage with folders.
     * @param fileMetadataStorage   A storage with files.
     */
    public FolderContentView(FolderMetadataStorage folderMetadataStorage, FileMetadataStorage fileMetadataStorage) {

        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
        this.fileMetadataStorage = checkNotNull(fileMetadataStorage);
    }

    /**
     * Handles a {@link GetFolderContent} query and provides the folder content.
     *
     * @param query The query from a client.
     * @return The content of the required folder.
     */
    @Override
    public FolderContent process(GetFolderContent query) {

        checkNotNull(query);

        if (logger.isDebugEnabled()) {
            logger.debug("Staring the FolderContent view.");
        }

        FolderMetadataRecord folder = findFolderMetadataRecord(query.folderId());
        if (logger.isDebugEnabled()) {
            logger.debug("Found a folder: {}", folder);
        }

        checkFolderOwner(folder, query.currentUser());

        return getFolderContent(query.folderId());
    }

    /**
     * Finds a {@link FolderMetadataRecord} with the provided identifier.
     *
     * @param folderId An identifier of the required folder.
     * @return The corresponding {@link FolderMetadataRecord}.
     * @throws NotFoundException in case the desired folder does not exist.
     */
    private FolderMetadataRecord findFolderMetadataRecord(FolderId folderId) {

        FolderMetadataRecord folder = folderMetadataStorage.get(folderId);
        if (folder == null) {

            if (logger.isDebugEnabled()) {
                logger.debug("The folder with identifier {} was not found.", folderId);
            }

            throw new NotFoundException("This folder does not exist.");
        }

        return folder;
    }

    /**
     * Checks whether the provided {@link FolderMetadataRecord} belongs to the provided {@link UserRecord}.
     *
     * @param folder     The {@link FolderMetadataRecord} to access.
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
     * Provides the {@link FolderContent} of a folder with the provided {@link FolderId} identifier.
     *
     * @param folderId An identifier of teh required folder.
     * @return The content of the needed folder.
     */
    private FolderContent getFolderContent(FolderId folderId) {

        List<Folder> nestedFolders = getNestedFolders(folderId);
        List<File> nestedFiles = getNestedFiles(folderId);

        return new FolderContent(nestedFolders, nestedFiles);
    }

    /**
     * Provides a list of all the child {@link Folder}s for the folder with the provided {@link FolderId}.
     *
     * @param folderId A parent folder identifier.
     * @return A list of the child folders.
     */
    private List<Folder> getNestedFolders(FolderId folderId) {

        return folderMetadataStorage.getChildFolders(folderId)
                .stream()
                .map(Folder::fromFolderMetadataRecord)
                .sorted()
                .collect(Collectors.toCollection(ArrayList::new));
    }

    /**
     * Provides a list of all the child {@link File}s for the folder with the provided {@link FolderId}.
     *
     * @param folderId A parent folder identifier.
     * @return A list of the child files.
     */
    private List<File> getNestedFiles(FolderId folderId) {

        return fileMetadataStorage.getChildFiles(folderId)
                .stream()
                .map(File::fromFileMetadataRecord)
                .sorted()
                .collect(Collectors.toCollection(ArrayList::new));
    }
}
