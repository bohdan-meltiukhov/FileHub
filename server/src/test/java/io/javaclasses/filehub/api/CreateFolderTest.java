package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The CreateFolder command should")
class CreateFolderTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {

        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(CreateFolder.class);
    }
}
