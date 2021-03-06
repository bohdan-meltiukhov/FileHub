package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.FileId;
import io.javaclasses.filehub.storage.FolderId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.javaclasses.filehub.api.IdGenerator.generate;
import static io.javaclasses.filehub.api.MimeType.IMAGE;
import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static nl.jqno.equalsverifier.Warning.NULL_FIELDS;

@DisplayName("The File should")
class FileTest {

    private NullPointerTester prepareTester(File file) {

        return new NullPointerTester()
                .setDefault(FileId.class, file.fileId())
                .setDefault(FileSystemItemName.class, file.filename())
                .setDefault(MimeType.class, file.mimeType())
                .setDefault(FileSize.class, file.fileSize())
                .setDefault(FolderId.class, file.parentFolderId());
    }

    private File prepareFile() {

        return new File(new FileId(generate()), new FileSystemItemName("new_file.png"), IMAGE,
                new FileSize(285), new FolderId(generate()));
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        File file = prepareFile();
        NullPointerTester tester = prepareTester(file);

        tester.testAllPublicConstructors(File.class);
        tester.testAllPublicStaticMethods(File.class);
        tester.testAllPublicInstanceMethods(file);
    }

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(File.class)
                .suppress(NULL_FIELDS)
                .verify();
    }
}
