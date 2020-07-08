package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.FileSystemItemName;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.javaclasses.filehub.api.IdGenerator.generate;
import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static nl.jqno.equalsverifier.Warning.NULL_FIELDS;

@DisplayName("The FolderMetadataRecord should")
class FolderMetadataRecordTest {

    private FolderMetadataRecord prepareFolder() {

        return new FolderMetadataRecord(new FolderId(generate()), new UserId(generate()),
                new FileSystemItemName("New folder"), new FolderId(generate()));
    }

    private NullPointerTester prepareTester(FolderMetadataRecord folder) {

        return new NullPointerTester()
                .setDefault(FolderId.class, folder.id())
                .setDefault(UserId.class, folder.userId())
                .setDefault(FileSystemItemName.class, folder.folderName());
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {

        FolderMetadataRecord folder = prepareFolder();
        NullPointerTester tester = prepareTester(folder);

        tester.testAllPublicConstructors(FolderMetadataRecord.class);
        tester.testAllPublicInstanceMethods(folder);
    }

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(FolderMetadataRecord.class)
                .suppress(NULL_FIELDS)
                .verify();
    }
}
