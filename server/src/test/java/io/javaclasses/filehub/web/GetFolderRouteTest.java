package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javaclasses.filehub.api.CurrentUser;
import io.javaclasses.filehub.api.FileSystemItemName;
import io.javaclasses.filehub.api.Folder;
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
import static io.javaclasses.filehub.api.Folder.fromFolderMetadataRecord;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static org.apache.http.HttpStatus.SC_FORBIDDEN;
import static org.apache.http.HttpStatus.SC_NOT_FOUND;
import static org.apache.http.HttpStatus.SC_OK;

@DisplayName("The GetFolderRoute should")
class GetFolderRouteTest {

    private FolderMetadataRecord createFolderMetadataRecord(FolderId folderId, UserId userId) {

        return new FolderMetadataRecord(folderId, userId, new FileSystemItemName("Root"));
    }

    private GetFolderRoute prepareRoute(FolderMetadataRecord folderRecord) {

        FolderMetadataStorage folderStorage = new FolderMetadataStorage();
        folderStorage.put(folderRecord);

        return new GetFolderRoute(folderStorage);
    }

    private GetFolderRoute prepareRoute(FolderId folderId, UserId userId) {

        FolderMetadataRecord folderRecord = createFolderMetadataRecord(folderId, userId);
        FolderMetadataStorage folderStorage = new FolderMetadataStorage();
        folderStorage.put(folderRecord);

        return new GetFolderRoute(folderStorage);
    }

    private void saveCurrentUser(UserId userId, FolderId folderId) {

        UserRecord userRecord = new UserRecord(userId, new Username("Benedict"), "", folderId);
        CurrentUser.set(userRecord);
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

    /**
     * Creates a {@link Gson} object with registered type adapters.
     *
     * @return The created {@link Gson} object.
     */
    private Gson createGson() {

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(Folder.class, new FolderSerializer());
        return gsonBuilder.create();
    }

    @Test
    @DisplayName("handle the get folder request.")
    void testGetFolder() {

        FolderId folderId = new FolderId(generate());
        UserId userId = new UserId(generate());
        FolderMetadataRecord folderRecord = createFolderMetadataRecord(folderId, userId);
        saveCurrentUser(userId, folderId);

        Gson gson = createGson();
        Folder folderDto = fromFolderMetadataRecord(folderRecord);
        String expectedResponse = gson.toJson(folderDto, Folder.class);

        GetFolderRoute route = prepareRoute(folderRecord);

        Request mockRequest = mockRequest(folderId);
        Response mockResponse = mockResponse();

        String responseContent = (String) route.handle(mockRequest, mockResponse);

        assertWithMessage("The GetFolderRoute set incorrect successful status code.")
                .that(mockResponse.status())
                .isEqualTo(SC_OK);

        assertWithMessage("The GetFolderRoute returned incorrect folder.")
                .that(responseContent)
                .isEqualTo(expectedResponse);
    }

    @Test
    @DisplayName("send a 'Not Found' status code when the desired folder does not exist.")
    void testRouteWhenFolderNotFound() {

        FolderId folderId = new FolderId(generate());
        UserId userId = new UserId(generate());
        saveCurrentUser(userId, folderId);

        GetFolderRoute route = prepareRoute(folderId, userId);

        Request mockRequest = mockRequest(new FolderId("nonexistent-folder"));
        Response mockResponse = mockResponse();

        route.handle(mockRequest, mockResponse);

        assertWithMessage("The route responded with incorrect status code.")
                .that(mockResponse.status())
                .isEqualTo(SC_NOT_FOUND);
    }

    @Test
    @DisplayName("send a 'Forbidden' status code when the user is not a folder owner.")
    void testRouteWhenUserIsIncorrect() {

        FolderId folderId = new FolderId(generate());
        UserId userId = new UserId(generate());
        saveCurrentUser(new UserId("another-user"), folderId);

        GetFolderRoute route = prepareRoute(folderId, userId);

        Request mockRequest = mockRequest(folderId);
        Response mockResponse = mockResponse();

        route.handle(mockRequest, mockResponse);

        assertWithMessage("The route responded with incorrect status code.")
                .that(mockResponse.status())
                .isEqualTo(SC_FORBIDDEN);
    }
}
