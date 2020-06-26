package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The RegisterUser command should")
class RegisterUserTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {

        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Username.class, new Username("Benedict"));
        tester.setDefault(Password.class, new Password("Qwerty123"));

        tester.testAllPublicConstructors(RegisterUser.class);
        tester.testAllPublicInstanceMethods(new RegisterUser(new Username("Benedict"),
                new Password("Qwerty123")));
    }
}
