package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;

@DisplayName("The GetUser command should")
class GetUserTest {

    private UserRecord createUserRecord() {

        return new UserRecord(new UserId(generate()), new Username("administrator"), "",
                new FolderId(""));
    }

    private void saveCurrentUser(UserRecord userRecord) {

        CurrentUser.set(userRecord);
    }

    @Test
    @DisplayName("provide correct user.")
    void testCurrentUser() {

        UserRecord userRecord = createUserRecord();
        saveCurrentUser(userRecord);

        GetUser query = new GetUser();

        assertWithMessage("The GetUser query provided incorrect user record.")
                .that(query.currentUser())
                .isEqualTo(userRecord);
    }
}
