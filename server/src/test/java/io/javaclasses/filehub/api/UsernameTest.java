package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import nl.jqno.equalsverifier.Warning;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("The Username should")
class UsernameTest {

    @Test
    @DisplayName("accept string values with length 8 or more.")
    void testLongValues() {

        assertWithMessage("The Username should accept a 8-characters string.")
                .that(new Username("Benedict"))
                .isNotNull();

        assertWithMessage("The Username should accept a 10-characters string.")
                .that(new Username("Clementine"))
                .isNotNull();
    }

    @Test
    @DisplayName("not accept string values shorter than 8 characters.")
    void testShortValues() {

        assertThrows(UsernameValidationException.class, () -> new Username("William"),
                "The Username should throw a UsernameValidationError if it receives a 7-characters string.");

        assertThrows(UsernameValidationException.class, () -> new Username("Bob"),
                "The Username should throw a UsernameValidationError if it receives a 3-characters string.");

        assertThrows(UsernameValidationException.class, () -> new Username(""),
                "The Username should throw a UsernameValidationError if it receives an empty string.");
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(Username.class);
        tester.testAllPublicInstanceMethods(new Username("Clementine"));
    }

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(Username.class)
                .suppress(Warning.NULL_FIELDS)
                .verify();
    }
}
