package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.Token;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.ZoneId;

import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static nl.jqno.equalsverifier.Warning.NULL_FIELDS;

@DisplayName("The TokenRecord should")
class TokenRecordTest {

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(TokenRecord.class)
                .suppress(NULL_FIELDS)
                .verify();
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Token.class, new Token(""));
        tester.setDefault(UserId.class, new UserId(""));
        tester.setDefault(TokenId.class, new TokenId(""));

        tester.testAllPublicConstructors(TokenRecord.class);
        tester.testAllPublicInstanceMethods(new TokenRecord(new TokenId(""), new Token(""),
                new UserId(""), LocalDateTime.now(ZoneId.systemDefault())));
    }
}
