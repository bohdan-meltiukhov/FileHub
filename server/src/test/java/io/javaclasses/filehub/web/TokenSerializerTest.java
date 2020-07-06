package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.Token;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The TokenSerializer should")
class TokenSerializerTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Token.class, new Token(""));

        tester.testAllPublicConstructors(TokenSerializer.class);
        tester.testAllPublicInstanceMethods(new TokenSerializer());
    }
}
