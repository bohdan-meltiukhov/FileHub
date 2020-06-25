package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.UsernameAlreadyTakenException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The UsernameAlreadyTakenExceptionSerializer should")
class UsernameAlreadyTakenExceptionSerializerTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(UsernameAlreadyTakenException.class, new UsernameAlreadyTakenException(""));

        tester.testAllPublicConstructors(UsernameAlreadyTakenExceptionSerializer.class);
        tester.testAllPublicInstanceMethods(new UsernameAlreadyTakenExceptionSerializer());
    }
}
