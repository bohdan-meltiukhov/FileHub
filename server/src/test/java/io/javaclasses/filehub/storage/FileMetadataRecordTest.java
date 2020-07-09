package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.FileSize;
import io.javaclasses.filehub.api.FileSystemItemName;
import io.javaclasses.filehub.api.MimeType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.javaclasses.filehub.api.IdGenerator.generate;
import static io.javaclasses.filehub.api.MimeType.IMAGE;
import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static nl.jqno.equalsverifier.Warning.NULL_FIELDS;

@DisplayName("The FileMetadataRecord should")
class FileMetadataRecordTest {

    private NullPointerTester prepareTester(FileMetadataRecord file) {

        return new NullPointerTester()
                .setDefault(FileId.class, file.id())
                .setDefault(FileSystemItemName.class, file.filename())
                .setDefault(MimeType.class, file.mimeType())
                .setDefault(FileSize.class, file.fileSize())
                .setDefault(FolderId.class, file.parentFolderId())
                .setDefault(UserId.class, file.getUserId());
    }

    private FileMetadataRecord prepareFile() {

        return new FileMetadataRecord(new FileId(generate()), new FileSystemItemName("new_file.png"), IMAGE,
                new FileSize(285), new UserId(generate()), new FolderId(generate()));
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        FileMetadataRecord file = prepareFile();
        NullPointerTester tester = prepareTester(file);

        tester.testAllPublicConstructors(FileMetadataRecord.class);
        tester.testAllPublicInstanceMethods(file);
    }

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(FileMetadataRecord.class)
                .suppress(NULL_FIELDS)
                .verify();
    }
}
