package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import nl.jqno.equalsverifier.Warning;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("The Password should")
class PasswordTest {

    @Test
    @DisplayName("accept string values with length 8 or more.")
    void testLongValues() {

        assertWithMessage("The Password should accept a 8-characters string.")
                .that(new Password("12345678"))
                .isNotNull();

        assertWithMessage("The Password should accept a 10-characters string.")
                .that(new Password("1234567890"))
                .isNotNull();
    }

    @Test
    @DisplayName("not accept string values shorter than 8 characters.")
    void testShortValues() {

        assertThrows(PasswordValidationException.class, () -> new Password("1234567"),
                "The Password should throw a PasswordValidationError if it receives a 7-characters string.");

        assertThrows(PasswordValidationException.class, () -> new Password("123"),
                "The Password should throw a PasswordValidationError if it receives a 3-characters string.");

        assertThrows(PasswordValidationException.class, () -> new Password(""),
                "The Password should throw a PasswordValidationError if it receives an empty string.");
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(Password.class);
        tester.testAllPublicInstanceMethods(new Password("Clementine"));
    }

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(Password.class)
                .suppress(Warning.NULL_FIELDS)
                .verify();
    }
}
