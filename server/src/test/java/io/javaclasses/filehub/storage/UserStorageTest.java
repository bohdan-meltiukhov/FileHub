package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.IdGenerator;
import io.javaclasses.filehub.api.Username;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("The UserStorage")
class UserStorageTest {

    private UserStorage prepareUserStorage(Username username) {

        return prepareUserStorage(username, "");
    }

    private UserStorage prepareUserStorage(Username username, String password) {

        UserStorage userStorage = new UserStorage();
        userStorage.put(new UserRecord(new UserId(IdGenerator.generate()), username, password));
        return userStorage;
    }

    @Test
    @DisplayName("indicate whether a username exists.")
    void testContainsUsername() {

        Username username = new Username("administrator");
        UserStorage userStorage = prepareUserStorage(username);

        assertWithMessage("The UserStorage.containsUsername() method did not return true when the " +
                "provided username existed.")
                .that(userStorage.contains(username))
                .isTrue();

        assertWithMessage("The UserStorage.containsUsername() method did not return false when the " +
                "provided username did not exist.")
                .that(userStorage.contains(new Username("Benedict")))
                .isFalse();
    }

    @Test
    @DisplayName("provide users by username and password.")
    void testGet() {

        Username username = new Username("administrator");
        String password = "secure-password";
        UserStorage userStorage = prepareUserStorage(username, password);

        assertWithMessage("The UserStorage.get(username) method didn't find the user.")
                .that(userStorage.get(username, password))
                .isNotNull();

        assertWithMessage("The UserStorage.get(username) method found a user with incorrect username.")
                .that(userStorage.get(username, password).username())
                .isEqualTo(username);
    }

    @Test
    @DisplayName("not accept null pointers.")
    void testNullPointers() {

        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Username.class, new Username("administrator"));

        tester.testAllPublicConstructors(UserStorage.class);
        tester.testAllPublicInstanceMethods(new UserStorage());
    }
}
