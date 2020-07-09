package io.javaclasses.filehub.storage;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link Storage} for {@link FolderMetadataRecord}.
 */
public class FolderMetadataStorage extends InMemoryStorage<FolderId, FolderMetadataRecord> {

    /**
     * Provides all children folders for the specified folder.
     *
     * @param folderId The folder identifier.
     * @return A list of child folders.
     */
    public List<FolderMetadataRecord> getChildFolders(FolderId folderId) {

        checkNotNull(folderId);

        return getAll().stream()
                .filter(folder -> folder.parentFolderId() != null && folder.parentFolderId().equals(folderId))
                .collect(Collectors.toCollection(ArrayList::new));
    }
}
