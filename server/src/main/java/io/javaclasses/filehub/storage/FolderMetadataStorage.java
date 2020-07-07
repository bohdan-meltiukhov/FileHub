package io.javaclasses.filehub.storage;

import io.javaclasses.filehub.api.NestedItems;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * A {@link Storage} for {@link FolderMetadataRecord}.
 */
public class FolderMetadataStorage extends InMemoryStorage<FolderId, FolderMetadataRecord> {

    /**
     * Provides all children folders for the specified folder.
     *
     * @param folderId The identifier of the required folder.
     * @return A list of child folders.
     */
    public List<FolderMetadataRecord> getChildFolders(FolderId folderId) {

        return getAll().stream()
                .filter(folder -> folder.parentFolderId().equals(folderId))
                .collect(Collectors.toCollection(ArrayList::new));
    }
}
