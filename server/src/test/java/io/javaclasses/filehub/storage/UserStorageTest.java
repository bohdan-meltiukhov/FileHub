package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.Password;
import io.javaclasses.filehub.api.PasswordHash;
import io.javaclasses.filehub.api.Username;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("The UserStorage")
class UserStorageTest {

    private UserStorage prepareUserStorage(Username username) {

        UserStorage userStorage = new UserStorage();
        userStorage.put(new UserRecord(new UserId(), username, new PasswordHash(new Password("Qazxsw123"))));
        return userStorage;
    }

    @Test
    @DisplayName("indicate whether a username exists.")
    void testContainsUsername() {

        Username username = new Username("administrator");
        UserStorage userStorage = prepareUserStorage(username);

        assertWithMessage("The UserStorage.containsUsername() method should return true if the " +
                "provided username exists.")
                .that(userStorage.containsUsername(username))
                .isTrue();

        assertWithMessage("The UserStorage.containsUsername() method should return false if the " +
                "provided username does not exist.")
                .that(userStorage.containsUsername(new Username("Benedict")))
                .isFalse();
    }

    @Test
    @DisplayName("not accept null pointers.")
    void testNullPointers() {

        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(UserStorage.class);
        tester.testAllPublicInstanceMethods(new UserStorage());
    }
}
