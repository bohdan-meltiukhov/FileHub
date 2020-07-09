package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javaclasses.filehub.api.CurrentUser;
import io.javaclasses.filehub.api.File;
import io.javaclasses.filehub.api.FileSize;
import io.javaclasses.filehub.api.FileSystemItemName;
import io.javaclasses.filehub.api.Folder;
import io.javaclasses.filehub.api.FolderContent;
import io.javaclasses.filehub.api.Username;
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
import spark.Request;
import spark.Response;

import java.util.ArrayList;
import java.util.List;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static io.javaclasses.filehub.api.MimeType.BOOK;
import static io.javaclasses.filehub.api.MimeType.IMAGE;
import static org.apache.http.HttpStatus.SC_FORBIDDEN;
import static org.apache.http.HttpStatus.SC_NOT_FOUND;

@DisplayName("The GetFolderContentRoute should")
class GetFolderContentRouteTest {

    private List<FolderMetadataRecord> prepareFolders(UserId userId, FolderId parentFolderId) {

        List<FolderMetadataRecord> folders = new ArrayList<>();

        folders.add(new FolderMetadataRecord(new FolderId(generate()), userId,
                new FileSystemItemName("Documents"), parentFolderId));
        folders.add(new FolderMetadataRecord(new FolderId(generate()), userId,
                new FileSystemItemName("Images"), parentFolderId));

        return folders;
    }

    private List<FileMetadataRecord> prepareFiles(UserId userId, FolderId parentFolderId) {

        List<FileMetadataRecord> files = new ArrayList<>();

        files.add(new FileMetadataRecord(new FileId(generate()), new FileSystemItemName("guide.pdf"), BOOK,
                new FileSize(94027), userId, parentFolderId));
        files.add(new FileMetadataRecord(new FileId(generate()), new FileSystemItemName("photo.png"), IMAGE,
                new FileSize(2046), userId, parentFolderId));

        return files;
    }

    private GetFolderContentRoute prepareRoute(List<FolderMetadataRecord> folders, List<FileMetadataRecord> files,
                                               FolderId parentFolderId, UserId userId) {

        FolderMetadataStorage folderStorage = new FolderMetadataStorage();
        FileMetadataStorage fileStorage = new FileMetadataStorage();

        folders.forEach(folderStorage::put);
        folderStorage.put(new FolderMetadataRecord(parentFolderId, userId, new FileSystemItemName("Parent")));
        files.forEach(fileStorage::put);

        return new GetFolderContentRoute(folderStorage, fileStorage);
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

    private FolderContent createFolderContent(List<FolderMetadataRecord> folders, List<FileMetadataRecord> files) {

        List<Folder> folderDtoList = new ArrayList<>();
        folders.forEach(folder -> folderDtoList.add(Folder.fromFolderMetadataRecord(folder)));

        List<File> fileDtoList = new ArrayList<>();
        files.forEach(file -> fileDtoList.add(File.fromFileMetadataRecord(file)));

        return new FolderContent(folderDtoList, fileDtoList);
    }

    private Gson createGson() {

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(FolderContent.class, new FolderContentSerializer());
        return gsonBuilder.create();
    }

    @Test
    @DisplayName("provide folder content.")
    void testGetFolderContent() {

        UserId userId = new UserId(generate());
        FolderId folderId = new FolderId(generate());
        List<FolderMetadataRecord> folders = prepareFolders(userId, folderId);
        List<FileMetadataRecord> files = prepareFiles(userId, folderId);

        saveCurrentUser(userId, folderId);
        GetFolderContentRoute route = prepareRoute(folders, files, folderId, userId);

        FolderContent expectedFolderContent = createFolderContent(folders, files);

        Request mockRequest = mockRequest(folderId);
        Response mockResponse = mockResponse();

        String responseContent = (String) route.handle(mockRequest, mockResponse);
        Gson gson = createGson();

        assertWithMessage("The GetFolderContentRoute provided incorrect folder content.")
                .that(responseContent)
                .isEqualTo(gson.toJson(expectedFolderContent, FolderContent.class));
    }

    private GetFolderContentRoute prepareRouteWithEmptyStorage(FolderId folderId, UserId userId) {

        return prepareRoute(new ArrayList<>(), new ArrayList<>(), folderId, userId);
    }

    @Test
    @DisplayName("should send a 'Not Found' status code when the desired folder does not exist.")
    void testRouteWhenFolderNotFound() {

        FolderId folderId = new FolderId(generate());
        UserId userId = new UserId(generate());
        saveCurrentUser(userId, folderId);
        GetFolderContentRoute route = prepareRouteWithEmptyStorage(folderId, userId);

        Request mockRequest = mockRequest(new FolderId("nonexistent-folder"));
        Response mockResponse = mockResponse();

        route.handle(mockRequest, mockResponse);

        assertWithMessage("The route responded with incorrect status code.")
                .that(mockResponse.status())
                .isEqualTo(SC_NOT_FOUND);
    }

    @Test
    @DisplayName("should send a 'Forbidden' status code when the user is not a folder owner.")
    void testRouteWhenUserIsIncorrect() {

        FolderId folderId = new FolderId(generate());
        UserId userId = new UserId(generate());
        saveCurrentUser(new UserId("another-user"), folderId);
        GetFolderContentRoute route = prepareRouteWithEmptyStorage(folderId, userId);

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
        new NullPointerTester().testAllPublicConstructors(GetFolderContentRoute.class);
    }
}
