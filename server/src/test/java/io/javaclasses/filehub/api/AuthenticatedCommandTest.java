package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("The AuthenticatedCommand should")
class AuthenticatedCommandTest {

    private UserRecord createUser() {

        return new UserRecord(new UserId(generate()), new Username("administrator"), "",
                new FolderId(generate()));
    }

    private void saveCurrentUser(UserRecord userRecord) {

        CurrentUser.set(userRecord);
    }

    private void clearCurrentUser() {

        CurrentUser.clear();
    }

    @Test
    @DisplayName("provide the current user.")
    void testGetCurrentUser() {

        UserRecord user = createUser();
        saveCurrentUser(user);

        AuthenticatedCommand command = new AuthenticatedCommand() {
        };

        assertWithMessage("The AuthenticatedCommand provided incorrect user.")
                .that(command.currentUser())
                .isEqualTo(user);
    }

    @Test
    @DisplayName("throw an exception when the current user is not set.")
    void testCommandWithNotSetUser() {

        UserRecord user = createUser();
        clearCurrentUser();

        AuthenticatedCommand command = new AuthenticatedCommand() {
        };

        assertThrows(CurrentUserNotSetException.class,
                command::currentUser,
                "The AuthenticatedCommand didn't throw an exception when no current user existed.");
    }
}
