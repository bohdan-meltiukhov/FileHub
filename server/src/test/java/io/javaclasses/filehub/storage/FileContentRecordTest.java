package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.javaclasses.filehub.api.IdGenerator.generate;
import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static nl.jqno.equalsverifier.Warning.NULL_FIELDS;

@DisplayName("The FileContentRecord should")
class FileContentRecordTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(FileId.class, new FileId(generate()));

        tester.testAllPublicConstructors(FileContentRecord.class);
        tester.testAllPublicInstanceMethods(new FileContentRecord(new FileId(generate()), new byte[0]));
    }

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(FileContentRecord.class)
                .suppress(NULL_FIELDS)
                .verify();
    }
}
