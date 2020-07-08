package io.javaclasses.filehub.storage;

import io.javaclasses.filehub.api.FileSystemItemName;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;

@DisplayName("The FolderMetadataStorage should")
class FolderMetadataStorageTest {

    private FolderMetadataRecord prepareFolder(FolderId parentFolderId) {

        return new FolderMetadataRecord(new FolderId(generate()), new UserId(generate()),
                new FileSystemItemName("New Folder"), parentFolderId);
    }

    private FolderMetadataStorage prepareStorage(FolderMetadataRecord folder) {

        FolderMetadataStorage storage = new FolderMetadataStorage();
        storage.put(folder);

        return storage;
    }

    @Test
    @DisplayName("provide correct child files.")
    void testGetChildFiles() {

        FolderId parentFolderId = new FolderId(generate());
        FolderMetadataRecord folder = prepareFolder(parentFolderId);
        FolderMetadataStorage storage = prepareStorage(folder);

        assertWithMessage("The FolderMetadataStorage.getChildFolders() provided incorrect folders.")
                .that(storage.getChildFolders(parentFolderId))
                .containsExactly(folder);
    }
}
