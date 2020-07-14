package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.CurrentUser;
import io.javaclasses.filehub.api.FileSystemItemName;
import io.javaclasses.filehub.api.Username;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import spark.Request;
import spark.Response;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static org.apache.http.HttpStatus.SC_FORBIDDEN;
import static org.apache.http.HttpStatus.SC_NOT_FOUND;
import static org.apache.http.HttpStatus.SC_OK;

@DisplayName("The CreateFolderRoute should")
class CreateFolderRouteTest {

    private FolderMetadataStorage prepareStorage(FolderId folderId, UserId userId) {

        FolderMetadataRecord parentFolder = new FolderMetadataRecord(folderId, userId,
                new FileSystemItemName("Documents"));
        FolderMetadataStorage folderStorage = new FolderMetadataStorage();
        folderStorage.put(parentFolder);

        return folderStorage;
    }

    private CreateFolderRoute prepareRoute(FolderMetadataStorage folderStorage) {

        return new CreateFolderRoute(folderStorage);
    }

    private CreateFolderRoute prepareRoute(FolderId parentFolderId, UserId userId) {

        FolderMetadataStorage folderStorage = prepareStorage(parentFolderId, userId);
        return new CreateFolderRoute(folderStorage);
    }

    private Request mockRequest(FolderId folderId) {

        return new Request() {
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

    private void saveCurrentUser(UserId userId, FolderId folderId) {

        UserRecord userRecord = new UserRecord(userId, new Username("Benedict"), "", folderId);
        CurrentUser.set(userRecord);
    }

    @Test
    @DisplayName("manage the folder creation.")
    void testCreateFolder() {

        FolderId parentFolderId = new FolderId(generate());
        UserId userId = new UserId(generate());
        saveCurrentUser(userId, parentFolderId);

        FolderMetadataStorage folderStorage = prepareStorage(parentFolderId, userId);
        CreateFolderRoute route = prepareRoute(folderStorage);

        Request request = mockRequest(parentFolderId);
        Response response = mockResponse();

        route.handle(request, response);

        assertWithMessage("The CreateFolderRoute didn't add a new folder to the storage.")
                .that(folderStorage.getChildFolders(parentFolderId))
                .isNotEmpty();

        assertWithMessage("The CreateFolderRoute set incorrect status code.")
                .that(response.status())
                .isEqualTo(SC_OK);
    }

    @Test
    @DisplayName("send a 'Not Found' status code when the requested folder does not exist.")
    void testRouteWithNonexistentFolder() {

        FolderId folderId = new FolderId(generate());
        UserId userId = new UserId(generate());
        saveCurrentUser(userId, folderId);

        CreateFolderRoute route = prepareRoute(folderId, userId);

        Request mockRequest = mockRequest(new FolderId("nonexistent-folder"));
        Response mockResponse = mockResponse();

        route.handle(mockRequest, mockResponse);

        assertWithMessage("The route responded with incorrect status code.")
                .that(mockResponse.status())
                .isEqualTo(SC_NOT_FOUND);
    }

    @Test
    @DisplayName("send a 'Forbidden' status code when the user is not a folder owner.")
    void testRouteWhenUserIsNotTheFolderOwner() {

        FolderId folderId = new FolderId(generate());
        UserId userId = new UserId(generate());
        saveCurrentUser(new UserId("another-user"), folderId);

        CreateFolderRoute route = prepareRoute(folderId, userId);

        Request mockRequest = mockRequest(folderId);
        Response mockResponse = mockResponse();

        route.handle(mockRequest, mockResponse);

        assertWithMessage("The route responded with incorrect status code.")
                .that(mockResponse.status())
                .isEqualTo(SC_FORBIDDEN);
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(CreateFolderRoute.class);
    }
}
