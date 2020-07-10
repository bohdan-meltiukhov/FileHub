package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("The FolderView should")
class FolderViewTest {

    private FolderMetadataRecord createFolder(FolderId folderId, UserId userId) {

        return new FolderMetadataRecord(folderId, userId, new FileSystemItemName("Root"));
    }

    private void prepareCurrentUser(UserId userId) {

        CurrentUser.set(new UserRecord(userId, new Username("administrator"), "",
                new FolderId(generate())));
    }

    private FolderView prepareView(FolderMetadataRecord folder) {

        FolderMetadataStorage folderStorage = new FolderMetadataStorage();
        folderStorage.put(folder);

        return new FolderView(folderStorage);
    }

    private FolderView prepareView(FolderId folderId, UserId userId) {

        FolderMetadataRecord folder = createFolder(folderId, userId);

        FolderMetadataStorage folderStorage = new FolderMetadataStorage();
        folderStorage.put(folder);

        return new FolderView(folderStorage);
    }

    @Test
    @DisplayName("provide the correct folder.")
    void testGetFolder() {

        FolderId folderId = new FolderId(generate());
        UserId userId = new UserId(generate());
        FolderMetadataRecord folderRecord = createFolder(folderId, userId);

        prepareCurrentUser(userId);
        GetFolder query = new GetFolder(folderId);

        FolderView view = prepareView(folderRecord);

        Folder folderDto = view.process(query);

        assertWithMessage("The FolderView returned incorrect folder.")
                .that(folderDto)
                .isEqualTo(Folder.fromFolderMetadataRecord(folderRecord));
    }

    private FolderView prepareViewWithEmptyStorage() {

        return new FolderView(new FolderMetadataStorage());
    }

    @Test
    @DisplayName("throw an exception in case the desired folder is not found.")
    void testWithNonexistentFolder() {

        UserId userId = new UserId(generate());
        prepareCurrentUser(userId);

        GetFolder query = new GetFolder(new FolderId("wrong-folder"));
        FolderView view = prepareView(new FolderId(generate()), userId);

        assertThrows(NotFoundException.class, () -> view.process(query), "The FolderView didn't " +
                "throw an exception for a nonexistent folder, though it should have.");
    }

    @Test
    @DisplayName("throw an exception when a wrong user tries to access the folder.")
    void testWithAnotherUser() {

        FolderId folderId = new FolderId(generate());
        prepareCurrentUser(new UserId("another-user"));

        GetFolder query = new GetFolder(folderId);
        FolderView view = prepareView(folderId, new UserId(generate()));

        assertThrows(AccessForbiddenException.class, () -> view.process(query), "The FolderView " +
                "didn't throw an exception for a wrong user, though it should have.");
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(FolderView.class);
        tester.testAllPublicInstanceMethods(new FolderView(new FolderMetadataStorage()));
    }
}
