package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static nl.jqno.equalsverifier.Warning.NULL_FIELDS;

@DisplayName("The FolderMetadataRecord should")
class FolderMetadataRecordTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(FolderId.class, new FolderId(""));
        tester.setDefault(UserId.class, new UserId(""));

        tester.testAllPublicConstructors(FolderMetadataRecord.class);
        tester.testAllPublicInstanceMethods(new FolderMetadataRecord(new FolderId(""), new FolderId(""),
                new UserId(""), ""));
    }

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(FolderMetadataRecord.class)
                .suppress(NULL_FIELDS)
                .verify();
    }
}
