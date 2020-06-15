package io.javaclasses.filehub.server.create_folder;

import io.javaclasses.filehub.server.FileSystem;
import io.javaclasses.filehub.server.Folder;
import io.javaclasses.filehub.server.Token;
import io.javaclasses.filehub.server.TokenService;
import io.javaclasses.filehub.server.authenticate.AuthenticationError;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("CreateFolderProcessTest should ")
class CreateFolderProcessTest {

    @DisplayName("create folders correctly.")
    @Test
    void testCreateFolder() throws AuthenticationError {

        Token token = new Token();
        TokenService.token = token;

        FileSystem.folders.clear();
        String parentId = "parent";

        CreateFolderProcess process = new CreateFolderProcess();
        CreateFolderCommand command = new CreateFolderCommand(token, parentId);
        Folder folder = process.createFolder(command);

        assertWithMessage("The create folder process should return a folder with correct parent ID")
                .that(folder.getParentId())
                .isEqualTo(parentId);

        assertWithMessage("The create folder process should add a folder to the file system.")
                .that(FileSystem.folders)
                .isNotEmpty();

        assertWithMessage("The create folder process should add to the file system the same folder " +
                "as returned.")
                .that(FileSystem.folders.values().toArray()[0])
                .isEqualTo(folder);
    }

    @DisplayName("throw Authentication errors.")
    @Test
    void testAuthenticationErrors() {

        TokenService.token = null;
        CreateFolderProcess process = new CreateFolderProcess();

        try {

            process.createFolder(new CreateFolderCommand(new Token(), "parent"));
        } catch (AuthenticationError e) {

            assertWithMessage("The create folder process should throw an Authentication error if " +
                    "the stored token is null.")
                    .that(true)
                    .isTrue();
        } catch (Exception e) {

            assertWithMessage("The create folder process should throw an Authentication error if " +
                    "the stored token is null.")
                    .that(false)
                    .isTrue();
        }

        TokenService.token = new Token();

        try {

            process.createFolder(new CreateFolderCommand(new Token(), "parent"));
        } catch (AuthenticationError e) {

            assertWithMessage("The create folder process should throw an Authentication error if " +
                    "the stored token is different from the token from the command.")
                    .that(true)
                    .isTrue();
        } catch (Exception e) {

            assertWithMessage("The create folder process should throw an Authentication error if " +
                    "the stored token is different from the token from the command.")
                    .that(false)
                    .isTrue();
        }
    }
}
