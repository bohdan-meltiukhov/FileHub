package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import io.javaclasses.filehub.api.PasswordValidationException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("The PasswordValidationErrorSerializer should")
class PasswordValidationErrorSerializerTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(PasswordValidationException.class, new PasswordValidationException("Password is too short."));

        tester.testAllPublicConstructors(PasswordValidationErrorSerializer.class);
        tester.testAllPublicInstanceMethods(new PasswordValidationErrorSerializer());
    }
}
