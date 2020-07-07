package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The GetFolderContent should")
class GetFolderContentTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {

        new NullPointerTester().testAllPublicConstructors(GetFolderContent.class);
    }
}
