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

@DisplayName("The FolderCreation should")
class FolderCreationTest {

    private FolderMetadataRecord createFolderMetadataRecord(FolderId folderId, UserId userId) {

        return new FolderMetadataRecord(folderId, userId, new FileSystemItemName("Root"));
    }

    private FolderMetadataStorage prepareFolderStorage(FolderMetadataRecord folderRecord) {

        FolderMetadataStorage storage = new FolderMetadataStorage();
        storage.put(folderRecord);

        return storage;
    }

    private void prepareCurrentUser(UserId userId) {

        CurrentUser.set(new UserRecord(userId, new Username("administrator"), "",
                new FolderId(generate())));
    }

    private FolderCreation prepareProcessWithEmptyStorage() {

        return new FolderCreation(new FolderMetadataStorage());
    }

    private FolderCreation prepareProcess(FolderId folderId, UserId userId) {

        FolderMetadataRecord folder = new FolderMetadataRecord(folderId, userId, new FileSystemItemName("Root"));

        FolderMetadataStorage folderStorage = new FolderMetadataStorage();
        folderStorage.put(folder);

        return new FolderCreation(folderStorage);
    }

    @Test
    @DisplayName("create a folder.")
    void testCreateFolder() {

        FolderId parentFolderId = new FolderId(generate());
        UserId userId = new UserId(generate());
        FolderMetadataRecord folderRecord = createFolderMetadataRecord(parentFolderId, userId);
        FolderMetadataStorage folderStorage = prepareFolderStorage(folderRecord);

        prepareCurrentUser(userId);

        CreateFolder command = new CreateFolder(parentFolderId);
        FolderCreation process = new FolderCreation(folderStorage);

        Folder createdFolder = process.handle(command);

        assertWithMessage("The FolderCreation process returned a folder with incorrect parent " +
                "identifier.")
                .that(createdFolder.parentFolderId())
                .isEqualTo(folderRecord.id());

        assertWithMessage("The FolderCreation process didn't add a folder to the storage.")
                .that(folderStorage.getChildFolders(parentFolderId))
                .isNotEmpty();
    }

    @Test
    @DisplayName("throw an exception in case the parent folder is not found.")
    void testProcessWhenFolderNotFound() {

        CreateFolder command = new CreateFolder(new FolderId("wrong-folder"));
        FolderCreation process = prepareProcessWithEmptyStorage();

        assertThrows(FolderNotFoundException.class, () -> process.handle(command), "The FolderCreation process " +
                "didn't throw an exception for a nonexistent folder, though it should have.");
    }

    @Test
    @DisplayName("throw an exception when a wrong user tries to access the parent folder.")
    void testProcessWithAnotherUser() {

        FolderId folderId = new FolderId(generate());

        CreateFolder command = new CreateFolder(folderId);
        FolderCreation process = prepareProcess(folderId, new UserId(generate()));

        prepareCurrentUser(new UserId("another-user"));

        assertThrows(AccessForbiddenException.class, () -> process.handle(command),
                "The FolderCreation process didn't throw an exception for a wrong user, " +
                        "though it should have.");

    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(FolderCreation.class);
        tester.testAllPublicInstanceMethods(new FolderCreation(new FolderMetadataStorage()));
    }
}
