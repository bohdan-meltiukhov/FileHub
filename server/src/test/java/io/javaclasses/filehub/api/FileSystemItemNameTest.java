package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static nl.jqno.equalsverifier.Warning.NULL_FIELDS;

@DisplayName("The FileSystemItemName should")
class FileSystemItemNameTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(FileSystemItemName.class);
        tester.testAllPublicInstanceMethods(new FileSystemItemName(""));
    }

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(FileSystemItemName.class)
                .suppress(NULL_FIELDS)
                .verify();
    }
}
