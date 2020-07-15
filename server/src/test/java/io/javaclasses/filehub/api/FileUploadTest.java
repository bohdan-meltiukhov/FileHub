package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.FileContentStorage;
import io.javaclasses.filehub.storage.FileId;
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
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static io.javaclasses.filehub.api.MimeType.IMAGE;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("The FileUpload process should")
class FileUploadTest {

    private File createFileDto(FolderId folderId) {

        return new File(new FileId(generate()), new FileSystemItemName("photo.png"), IMAGE,
                new FileSize(3846), folderId);
    }

    private static UploadFile prepareCommand(File file, byte[] content) {

        return new UploadFile(file.parentFolderId(), file, content);
    }

    private FileUpload prepareProcess(FolderId folderId, UserId userId, FileMetadataStorage fileMetadataStorage,
                                      FileContentStorage fileContentStorage) {

        FolderMetadataStorage folderStorage = new FolderMetadataStorage();
        FolderMetadataRecord folderRecord = new FolderMetadataRecord(folderId, userId,
                new FileSystemItemName("Root"));
        folderStorage.put(folderRecord);

        return new FileUpload(folderStorage, fileMetadataStorage, fileContentStorage);
    }

    private void saveCurrentUser(UserId userId, FolderId folderId) {

        UserRecord userRecord = new UserRecord(userId, new Username("Benedict"), "", folderId);
        CurrentUser.set(userRecord);
    }

    @Test
    @DisplayName("should add a file to storage.")
    void testUploadFile() {

        FolderId folderId = new FolderId(generate());
        File fileDto = createFileDto(folderId);
        byte[] content = "File content here.".getBytes();
        UserId userId = new UserId(generate());

        saveCurrentUser(userId, folderId);

        FileMetadataStorage fileMetadataStorage = new FileMetadataStorage();
        FileContentStorage fileContentStorage = new FileContentStorage();

        UploadFile command = prepareCommand(fileDto, content);
        FileUpload process = prepareProcess(folderId, userId, fileMetadataStorage, fileContentStorage);

        File returnedFile = process.handle(command);

        assertWithMessage("The FileUpload process didn't add a record to the FileMetadataStorage.")
                .that(fileMetadataStorage.getChildFiles(folderId))
                .isNotEmpty();

        assertWithMessage("The FileUpload process added incorrect record to the FileMetadataStorage.")
                .that(fromFileMetadataRecord(fileMetadataStorage.get(returnedFile.fileId())))
                .isEqualTo(fileDto);

        assertWithMessage("The FileUpload process didn't add a record to the FileContentStorage.")
                .that(fileContentStorage.get(returnedFile.fileId()))
                .isNotNull();

        assertWithMessage("The FileUpload process added a record with incorrect file content to the " +
                "FileContentStorage.")
                .that(fileContentStorage.get(returnedFile.fileId()).content())
                .isEqualTo(content);
    }

    @Test
    @DisplayName("throw an exception when the parent folder does not exist.")
    void testProcessWithNonexistentFolder() {

        FolderId folderId = new FolderId(generate());
        File fileDto = createFileDto(new FolderId("another-folder"));
        byte[] content = "File content here.".getBytes();
        UserId userId = new UserId(generate());

        saveCurrentUser(userId, folderId);

        FileMetadataStorage fileMetadataStorage = new FileMetadataStorage();
        FileContentStorage fileContentStorage = new FileContentStorage();

        UploadFile command = prepareCommand(fileDto, content);
        FileUpload process = prepareProcess(folderId, userId, fileMetadataStorage, fileContentStorage);

        assertThrows(FolderNotFoundException.class, () -> process.handle(command), "The FileUpload process " +
                "didn't throw an exception for a nonexistent parent folder.");
    }

    @Test
    @DisplayName("throw an exception when not a folder owner tries to upload a file.")
    void testProcessWithNotAFolderOwner() {

        FolderId folderId = new FolderId(generate());
        File fileDto = createFileDto(folderId);
        byte[] content = "File content here.".getBytes();
        UserId userId = new UserId(generate());

        saveCurrentUser(new UserId("another-user"), folderId);

        FileMetadataStorage fileMetadataStorage = new FileMetadataStorage();
        FileContentStorage fileContentStorage = new FileContentStorage();

        UploadFile command = prepareCommand(fileDto, content);
        FileUpload process = prepareProcess(folderId, userId, fileMetadataStorage, fileContentStorage);

        assertThrows(AccessForbiddenException.class, () -> process.handle(command), "The FileUpload process " +
                "didn't throw an exception when not a folder owner tried to upload a file.");
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(FileUpload.class);
        tester.testAllPublicInstanceMethods(new FileUpload(new FolderMetadataStorage(), new FileMetadataStorage(),
                new FileContentStorage()));
    }
}
