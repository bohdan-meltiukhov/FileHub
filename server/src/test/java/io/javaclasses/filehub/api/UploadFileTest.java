package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.FileId;
import io.javaclasses.filehub.storage.FolderId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.javaclasses.filehub.api.IdGenerator.generate;

@DisplayName("The UploadFile should")
class UploadFileTest {

    private File createFile() {

        return new File(new FileId(generate()), new FileSystemItemName("photo.png"), MimeType.IMAGE,
                new FileSize(8463), new FolderId(generate()));
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(File.class, createFile());
        tester.setDefault(FolderId.class, new FolderId(generate()));

        tester.testAllPublicConstructors(UploadFile.class);
    }
}
