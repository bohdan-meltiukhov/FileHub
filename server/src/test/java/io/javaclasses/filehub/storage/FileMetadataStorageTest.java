package io.javaclasses.filehub.storage;

import io.javaclasses.filehub.api.FileSize;
import io.javaclasses.filehub.api.FileSystemItemName;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static io.javaclasses.filehub.api.MimeType.IMAGE;

@DisplayName("The FileMetadataStorage should")
class FileMetadataStorageTest {

    private FileMetadataRecord prepareFile(FolderId parentFolderId) {

        return new FileMetadataRecord(new FileId(generate()), new FileSystemItemName("photo.png"), IMAGE,
                new FileSize(538), new UserId(generate()), parentFolderId);
    }

    private FileMetadataStorage prepareStorage(FileMetadataRecord file) {

        FileMetadataStorage storage = new FileMetadataStorage();
        storage.put(file);

        return storage;
    }

    @Test
    @DisplayName("provide correct child files.")
    void testGetChildFiles() {

        FolderId parentFolderId = new FolderId(generate());
        FileMetadataRecord file = prepareFile(parentFolderId);
        FileMetadataStorage storage = prepareStorage(file);

        assertWithMessage("The FileMetadataStorage.getChildFiles() provided incorrect files.")
                .that(storage.getChildFiles(parentFolderId))
                .containsExactly(file);
    }
}
