package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.CurrentUser;
import io.javaclasses.filehub.api.File;
import io.javaclasses.filehub.api.FileSize;
import io.javaclasses.filehub.api.FileSystemItemName;
import io.javaclasses.filehub.api.Username;
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
import spark.Request;
import spark.Response;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import java.io.ByteArrayInputStream;
import java.io.IOException;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static io.javaclasses.filehub.api.MimeType.IMAGE;
import static java.lang.Long.valueOf;
import static org.apache.http.HttpStatus.SC_FORBIDDEN;
import static org.apache.http.HttpStatus.SC_NOT_FOUND;
import static org.apache.http.HttpStatus.SC_OK;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@DisplayName("The UploadFileRoute should")
class UploadFileRouteTest {

    private static File createFileDto(FolderId folderId) {

        return new File(new FileId(generate()), new FileSystemItemName("photo.png"), IMAGE,
                new FileSize(3846), folderId);
    }

    private UploadFileRoute prepareRoute(FolderId folderId, UserId userId, FileMetadataStorage fileMetadataStorage,
                                         FileContentStorage fileContentStorage) {

        FolderMetadataStorage folderStorage = new FolderMetadataStorage();
        FolderMetadataRecord folderRecord = new FolderMetadataRecord(folderId, userId,
                new FileSystemItemName("Root"));
        folderStorage.put(folderRecord);

        return new UploadFileRoute(folderStorage, fileMetadataStorage, fileContentStorage);
    }

    private void saveCurrentUser(UserId userId, FolderId folderId) {

        UserRecord userRecord = new UserRecord(userId, new Username("Benedict"), "", folderId);
        CurrentUser.set(userRecord);
    }

    private Request mockRequest(FolderId folderId, File file, byte[] fileContent, String contentType) {

        return new Request() {
            @Override
            public HttpServletRequest raw() {

                try {

                    Part mockPart = mock(Part.class);

                    when(mockPart.getSubmittedFileName()).thenReturn(file.filename().value());
                    when(mockPart.getContentType()).thenReturn(contentType);
                    when(mockPart.getSize()).thenReturn(valueOf(file.fileSize().value()));
                    when(mockPart.getInputStream()).thenReturn(new ByteArrayInputStream(fileContent));

                    HttpServletRequest mockRequest = mock(HttpServletRequest.class);

                    when(mockRequest.getPart("file")).thenReturn(mockPart);

                    return mockRequest;

                } catch (IOException | ServletException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            public String params(String param) {
                return folderId.value();
            }
        };
    }

    private Response mockResponse() {

        return new Response() {
            private int status;

            @Override
            public void status(int statusCode) {
                status = statusCode;
            }

            @Override
            public int status() {
                return status;
            }
        };
    }

    @Test
    @DisplayName("should manage the file upload process.")
    void testUploadFile() throws IOException, ServletException {

        FolderId folderId = new FolderId(generate());
        File fileDto = createFileDto(folderId);
        byte[] content = "File content here.".getBytes();
        UserId userId = new UserId(generate());

        saveCurrentUser(userId, folderId);

        FileMetadataStorage fileMetadataStorage = new FileMetadataStorage();
        FileContentStorage fileContentStorage = new FileContentStorage();

        UploadFileRoute route = prepareRoute(folderId, userId, fileMetadataStorage, fileContentStorage);

        Request mockRequest = mockRequest(folderId, fileDto, content, "image/png");
        Response mockResponse = mockResponse();

        route.handle(mockRequest, mockResponse);

        assertWithMessage("The UploadFileRoute added a record with incorrect name to the " +
                "FileMetadataStorage.")
                .that(fileMetadataStorage.getAll().get(0).filename())
                .isEqualTo(fileDto.filename());

        assertWithMessage("The UploadFileRoute added a record with incorrect size to the " +
                "FileMetadataStorage.")
                .that(fileMetadataStorage.getAll().get(0).fileSize())
                .isEqualTo(fileDto.fileSize());

        assertWithMessage("The UploadFileRoute added a record with incorrect mime type to the " +
                "FileMetadataStorage.")
                .that(fileMetadataStorage.getAll().get(0).mimeType())
                .isEqualTo(IMAGE);

        assertWithMessage("The UploadFileRoute added a record with incorrect parent folder " +
                "identifier to the FileMetadataStorage.")
                .that(fileMetadataStorage.getAll().get(0).parentFolderId())
                .isEqualTo(folderId);

        assertWithMessage("The UploadFileRoute added an incorrect record to the FileContentStorage.")
                .that(fileContentStorage.getAll().get(0).content())
                .isEqualTo(content);

        assertWithMessage("The UploadFileRoute set incorrect status code when the file was uploaded " +
                "successfully.")
                .that(mockResponse.status())
                .isEqualTo(SC_OK);
    }

    @Test
    @DisplayName("set a 'Not Found' response status code when the requested folder does not exist.")
    void testRouteWithNonexistentFolder() throws IOException, ServletException {

        FolderId folderId = new FolderId(generate());
        File fileDto = createFileDto(folderId);
        byte[] content = "File content here.".getBytes();
        UserId userId = new UserId(generate());

        saveCurrentUser(userId, folderId);

        FileMetadataStorage fileMetadataStorage = new FileMetadataStorage();
        FileContentStorage fileContentStorage = new FileContentStorage();

        UploadFileRoute route = prepareRoute(folderId, userId, fileMetadataStorage, fileContentStorage);

        Request mockRequest = mockRequest(new FolderId("another-folder"), fileDto, content,
                "image/png");
        Response mockResponse = mockResponse();

        route.handle(mockRequest, mockResponse);

        assertWithMessage("The UploadFileRoute set incorrect status code for a nonexistent folder.")
                .that(mockResponse.status())
                .isEqualTo(SC_NOT_FOUND);
    }

    @Test
    @DisplayName("set a 'Forbidden' response status code when not a folder owner tries to upload a file.")
    void testRouteWithAnotherUser() throws IOException, ServletException {

        FolderId folderId = new FolderId(generate());
        File fileDto = createFileDto(folderId);
        byte[] content = "File content here.".getBytes();
        UserId userId = new UserId(generate());

        saveCurrentUser(new UserId("another-user"), folderId);

        FileMetadataStorage fileMetadataStorage = new FileMetadataStorage();
        FileContentStorage fileContentStorage = new FileContentStorage();

        UploadFileRoute route = prepareRoute(folderId, userId, fileMetadataStorage, fileContentStorage);

        Request mockRequest = mockRequest(folderId, fileDto, content, "image/png");
        Response mockResponse = mockResponse();

        route.handle(mockRequest, mockResponse);

        assertWithMessage("The UploadFileRoute set incorrect status code when not a folder owner " +
                "tried to upload a file.")
                .that(mockResponse.status())
                .isEqualTo(SC_FORBIDDEN);
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {

        NullPointerTester tester = new NullPointerTester();
        tester.testAllPublicConstructors(UploadFileRoute.class);
    }
}
