package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The FileId should")
class FileIdTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {

        new NullPointerTester().testAllPublicConstructors(FileId.class);
    }
}
