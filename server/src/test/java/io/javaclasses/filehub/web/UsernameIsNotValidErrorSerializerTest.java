package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.UsernameIsNotValidException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The UsernameValidationErrorSerializer should")
class UsernameIsNotValidErrorSerializerTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(UsernameIsNotValidException.class, new UsernameIsNotValidException("Username is too short."));

        tester.testAllPublicConstructors(UsernameIsNotValidErrorSerializer.class);
        tester.testAllPublicInstanceMethods(new UsernameIsNotValidErrorSerializer());
    }
}
