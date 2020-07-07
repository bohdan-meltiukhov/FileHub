package io.javaclasses.filehub.web;

import io.javaclasses.filehub.api.FolderContentView;
import io.javaclasses.filehub.api.GetFolderContent;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import io.javaclasses.filehub.storage.FileMetadataRecord;
import io.javaclasses.filehub.storage.FileMetadataStorage;

import spark.Request;
import spark.Response;
import spark.Route;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link Route} that handles a get-folder-content request.
 */
public class GetFolderContentRoute implements Route {

    /**
     * A storage with {@link FileMetadataRecord}s.
     */
    private final FileMetadataStorage fileMetadataStorage;

    /**
     * A storage with {@link FolderMetadataRecord}s.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    public GetFolderContentRoute(FileMetadataStorage fileMetadataStorage, FolderMetadataStorage folderMetadataStorage) {

        this.fileMetadataStorage = checkNotNull(fileMetadataStorage);
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
    }

    @Override
    public Object handle(Request request, Response response) {
        return null;
    }
}
