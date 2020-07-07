package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link Query} that represents intention of a client to get the content of a {@link FolderMetadataRecord}.
 */
public class GetFolderContent extends Query {

    /**
     * An identifier of the required folder.
     */
    private final FolderId folderId;

    /**
     * Creates an instance of the GetFolderContent query with set folder identifier.
     *
     * @param folderId An identifier of the required folder.
     */
    public GetFolderContent(FolderId folderId) {

        this.folderId = checkNotNull(folderId);
    }

    /**
     * Provides the identifier of the required folder.
     *
     * @return The folder identifier.
     */
    public FolderId folderId() {

        return folderId;
    }
}
