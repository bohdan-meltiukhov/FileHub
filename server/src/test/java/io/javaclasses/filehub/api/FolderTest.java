package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;
import io.javaclasses.filehub.storage.UserId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.javaclasses.filehub.api.Folder.fromFolderMetadataRecord;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static nl.jqno.equalsverifier.Warning.NULL_FIELDS;

@DisplayName("The Folder should")
class FolderTest {

    private FolderMetadataRecord prepareFolderMetadataRecord() {

        return new FolderMetadataRecord(new FolderId(generate()), new UserId(generate()),
                new FolderName("New folder"), new FolderId(generate()));
    }

    private Folder prepareFolder() {

        return fromFolderMetadataRecord(prepareFolderMetadataRecord(), new NestedItems(0));
    }

    private NullPointerTester prepareTester(Folder folder) {

        return new NullPointerTester()
                .setDefault(FolderId.class, folder.folderId())
                .setDefault(FolderName.class, folder.folderName())
                .setDefault(NestedItems.class, folder.nestedItems())
                .setDefault(FolderMetadataRecord.class, prepareFolderMetadataRecord());
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {

        Folder folder = prepareFolder();
        NullPointerTester tester = prepareTester(folder);

        tester.testAllPublicConstructors(Folder.class);
        tester.testAllPublicStaticMethods(Folder.class);
        tester.testAllPublicInstanceMethods(folder);
    }

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(Folder.class)
                .suppress(NULL_FIELDS)
                .verify();
    }
}
