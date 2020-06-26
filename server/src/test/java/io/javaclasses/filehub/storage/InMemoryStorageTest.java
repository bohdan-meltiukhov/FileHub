package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The InMemoryStorage should")
class InMemoryStorageTest {

    @Test
    @DisplayName("not accept null pointers.")
    void testNullPointers() {

        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(InMemoryStorage.class);
        tester.testAllPublicInstanceMethods(new InMemoryStorage<UserId, UserRecord>() {
        });
    }
}
