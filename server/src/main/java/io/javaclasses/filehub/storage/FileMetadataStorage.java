package io.javaclasses.filehub.storage;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link Storage} with {@link FileMetadataRecord}s.
 */
public class FileMetadataStorage extends InMemoryStorage<FileId, FileMetadataRecord> {

    /**
     * Provides all children files for the specified folder.
     *
     * @param folderId The identifier of the required folder.
     * @return A list of child files.
     */
    public List<FileMetadataRecord> getChildFiles(FolderId folderId) {

        checkNotNull(folderId);

        return getAll().stream()
                .filter(file -> file.parentFolderId() != null && file.parentFolderId().equals(folderId))
                .collect(Collectors.toCollection(ArrayList::new));
    }
}
