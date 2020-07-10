package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;

@DisplayName("The UserView should")
class UserViewTest {

    private UserRecord createUserRecord() {

        return new UserRecord(new UserId(generate()), new Username("administrator"), "",
                new FolderId(""));
    }

    private GetUser prepareQuery(UserRecord userRecord) {

        CurrentUser.set(userRecord);
        return new GetUser();
    }

    @Test
    @DisplayName("provide the correct user record.")
    void testProcess() {

        UserRecord userRecord = createUserRecord();
        GetUser query = prepareQuery(userRecord);
        UserView view = new UserView();

        assertWithMessage("The UserView provided incorrect user record.")
                .that(view.process(query))
                .isEqualTo(userRecord);
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        new NullPointerTester().testAllPublicInstanceMethods(new UserView());
    }
}
