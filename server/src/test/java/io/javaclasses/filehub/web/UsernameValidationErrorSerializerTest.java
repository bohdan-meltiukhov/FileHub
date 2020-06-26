package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.UsernameValidationException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The UsernameValidationErrorSerializer should")
class UsernameValidationErrorSerializerTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(UsernameValidationException.class, new UsernameValidationException("Username is too short."));

        tester.testAllPublicConstructors(UsernameValidationErrorSerializer.class);
        tester.testAllPublicInstanceMethods(new UsernameValidationErrorSerializer());
    }
}
