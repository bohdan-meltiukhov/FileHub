package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FileId;
import io.javaclasses.filehub.storage.FileMetadataRecord;
import io.javaclasses.filehub.storage.FileMetadataStorage;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.File.fromFileMetadataRecord;
import static io.javaclasses.filehub.api.Folder.fromFolderMetadataRecord;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("The FolderContentView should")
class FolderContentViewTest {

    private FolderMetadataRecord createFolder(FolderId parentFolderId, UserId userId) {

        return new FolderMetadataRecord(new FolderId(generate()), userId, new FileSystemItemName("New Folder"),
                parentFolderId);
    }

    private FileMetadataRecord createFile(FolderId parentFolderId, UserId userId) {

        return new FileMetadataRecord(new FileId(generate()), new FileSystemItemName("photo.png"), MimeType.IMAGE,
                new FileSize(6737), userId, parentFolderId);
    }

    private FolderContentView prepareView(FolderMetadataRecord folder, FileMetadataRecord file) {

        FolderMetadataStorage folderStorage = new FolderMetadataStorage();
        folderStorage.put(folder);
        folderStorage.put(new FolderMetadataRecord(folder.parentFolderId(), folder.userId(),
                new FileSystemItemName("Root")));

        FileMetadataStorage fileStorage = new FileMetadataStorage();
        fileStorage.put(file);

        return new FolderContentView(folderStorage, fileStorage);
    }

    private FolderContentView prepareView(FolderId folderId, UserId userId) {

        FolderMetadataStorage folderStorage = new FolderMetadataStorage();
        folderStorage.put(new FolderMetadataRecord(folderId, userId, new FileSystemItemName("Root")));

        FileMetadataStorage fileStorage = new FileMetadataStorage();

        return new FolderContentView(folderStorage, fileStorage);
    }

    private FolderContentView prepareViewWithEmptyStorage() {

        FolderMetadataStorage folderStorage = new FolderMetadataStorage();
        FileMetadataStorage fileStorage = new FileMetadataStorage();

        return new FolderContentView(folderStorage, fileStorage);
    }

    void prepareCurrentUser(UserId userId) {

        CurrentUser.set(new UserRecord(userId, new Username("administrator"), "",
                new FolderId(generate())));
    }

    @Test
    @DisplayName("provide correct folder content.")
    void testProcess() {

        FolderId folderId = new FolderId(generate());
        UserId userId = new UserId(generate());
        FolderMetadataRecord folder = createFolder(folderId, userId);
        FileMetadataRecord file = createFile(folderId, userId);

        prepareCurrentUser(userId);

        GetFolderContent query = new GetFolderContent(folderId);
        FolderContentView view = prepareView(folder, file);

        FolderContent folderContent = view.process(query);

        assertWithMessage("The FolderContentView provided incorrect nested folders.")
                .that(folderContent.folders())
                .containsExactly(fromFolderMetadataRecord(folder));

        assertWithMessage("The FolderContentView provided incorrect nested files.")
                .that(folderContent.files())
                .containsExactly(fromFileMetadataRecord(file));
    }

    @Test
    @DisplayName("throw an exception in case the desired folder is not found.")
    void testWithNonexistentFolder() {

        GetFolderContent query = new GetFolderContent(new FolderId("wrong-folder"));
        FolderContentView view = prepareViewWithEmptyStorage();

        assertThrows(NotFoundException.class, () -> view.process(query), "The FolderContentView didn't " +
                "throw an exception for a nonexistent folder, though it should have.");
    }

    @Test
    @DisplayName("throw an exception when a wrong user tries to access the folder.")
    void testWithAnotherUser() {

        UserId userId = new UserId(generate());
        FolderId folderId = new FolderId(generate());
        GetFolderContent query = new GetFolderContent(folderId);
        FolderContentView view = prepareView(folderId, userId);

        prepareCurrentUser(new UserId("wrong-user-id"));

        assertThrows(AccessForbiddenException.class, () -> view.process(query), "The FolderContentView " +
                "didn't throw an exception for a wrong user, though it should have.");
    }
}
