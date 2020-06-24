package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The PasswordHash should")
class PasswordHashTest {

    @Test
    @DisplayName("accept null values.")
    void testNullPointers() {

        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(PasswordHash.class);;
        tester.testAllPublicInstanceMethods(new PasswordHash(new Password("Qwerty123")));
    }
}
