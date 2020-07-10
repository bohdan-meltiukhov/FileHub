package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The FolderContent should")
class FolderContentTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {

        new NullPointerTester().testAllPublicConstructors(FolderContent.class);
    }
}
