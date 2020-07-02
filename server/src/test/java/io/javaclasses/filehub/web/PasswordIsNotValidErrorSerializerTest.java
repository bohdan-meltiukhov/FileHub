package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.PasswordIsNotValidException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The PasswordValidationErrorSerializer should")
class PasswordIsNotValidErrorSerializerTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(PasswordIsNotValidException.class, new PasswordIsNotValidException("Password is too short."));

        tester.testAllPublicConstructors(PasswordIsNotValidErrorSerializer.class);
        tester.testAllPublicInstanceMethods(new PasswordIsNotValidErrorSerializer());
    }
}
