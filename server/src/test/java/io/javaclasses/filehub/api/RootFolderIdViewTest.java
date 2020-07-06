package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;

@DisplayName("The RootFolderIdView process should")
class RootFolderIdViewTest {

    private RootFolderIdView prepareView(FolderId folderId) {

        UserRecord userRecord = new UserRecord(new UserId(generate()), new Username("administrator"),
                "", folderId);
        CurrentUser.set(userRecord);

        return new RootFolderIdView();
    }

    @Test
    @DisplayName("provide correct folder identifier.")
    void testHandle() {

        FolderId folderId = new FolderId(generate());
        RootFolderIdView view = prepareView(folderId);

        assertWithMessage("The RootFolderIdGetting view provided incorrect folder identifier.")
                .that(view.process(new GetRootFolderId()))
                .isEqualTo(folderId);
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(RootFolderIdView.class);
        tester.testAllPublicInstanceMethods(new RootFolderIdView());
    }
}
