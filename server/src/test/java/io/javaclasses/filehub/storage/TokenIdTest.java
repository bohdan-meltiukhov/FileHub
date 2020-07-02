package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static nl.jqno.equalsverifier.Warning.NULL_FIELDS;

@DisplayName("The TokenId should")
class TokenIdTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(TokenId.class);
        tester.testAllPublicInstanceMethods(new TokenId("id"));
    }

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(TokenId.class)
                .suppress(NULL_FIELDS)
                .verify();
    }
}
