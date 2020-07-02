package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import io.javaclasses.filehub.storage.UserStorage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.fail;

@DisplayName("The registration process should")
class RegistrationTest {

    private UserStorage prepareUserStorage(Username username) {

        UserStorage storage = new UserStorage();
        UserRecord userRecord = new UserRecord(new UserId(IdGenerator.generate()), username,
                PasswordHasher.hash(new Password("Qazxsw123")), new FolderId(""));
        storage.put(userRecord);
        return storage;
    }

    private RegisterUser prepareCommand() {

        Username username = new Username("administrator");
        Password password = new Password("Qazxsw123");
        return new RegisterUser(username, password);
    }

    @Test
    @DisplayName("add a user to an empty storage.")
    void testAddUser() {

        UserStorage storage = new UserStorage();
        Registration process = new Registration(storage);
        RegisterUser command = prepareCommand();

        process.handle(command);

        try {

            UserRecord userRecord = storage.getAll().get(0);

            assertWithMessage("The Registration process added a user record with incorrect " +
                    "username.")
                    .that(userRecord.username())
                    .isEqualTo(command.username());

            assertWithMessage("The Registration process added a user record with incorrect " +
                    "password hash.")
                    .that(userRecord.hashedPassword())
                    .isEqualTo(PasswordHasher.hash(command.password()));

        } catch (IndexOutOfBoundsException exception) {

            fail("The Registration process did not add a record to the storage.");
        }
    }

    @Test
    @DisplayName("not accept a username that is already taken.")
    void testUserExists() {

        Username username = new Username("administrator");
        Registration process = new Registration(prepareUserStorage(username));

        assertThrows(UsernameAlreadyTakenException.class, () ->
                process.handle(new RegisterUser(username, new Password("Qazxsw123"))),
                "The Registration process did not throw an exception in case a user " +
                        "with the provided username already existed in the storage, though it should have.");
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {

        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(Registration.class);
        tester.testAllPublicInstanceMethods(new Registration(new UserStorage()));
    }
}
