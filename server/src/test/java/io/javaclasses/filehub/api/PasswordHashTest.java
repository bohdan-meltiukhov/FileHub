package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import nl.jqno.equalsverifier.Warning;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static nl.jqno.equalsverifier.EqualsVerifier.forClass;

@DisplayName("The PasswordHash should")
class PasswordHashTest {

    @Test
    @DisplayName("accept null values.")
    void testNullPointers() {

        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(PasswordHash.class);
        ;
        tester.testAllPublicInstanceMethods(new PasswordHash(new Password("Qwerty123")));
    }

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(PasswordHash.class)
                .suppress(Warning.NULL_FIELDS)
                .verify();
    }
}
