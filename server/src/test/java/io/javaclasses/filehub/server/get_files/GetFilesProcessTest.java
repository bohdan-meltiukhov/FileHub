package io.javaclasses.filehub.server.get_files;

import io.javaclasses.filehub.server.*;
import io.javaclasses.filehub.server.authenticate.AuthenticationError;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("The GetFilesProcessTest should ")
class GetFilesProcessTest {

    @DisplayName("should provide folder content.")
    @Test
    void testGetFiles() throws AuthenticationError {

        String folderId = "Z5TX0lIFYoj2yv7W";

        FileSystem.folders.put(folderId,
                new Folder(folderId, "none", "Root", 4));

        List<Folder> folders = new ArrayList<>(Arrays.asList(
                new Folder("GWmx7zXEXqR6QGys", folderId, "Documents", 2),
                new Folder("P7KQ1F2HUOz9s7Ex", folderId, "Images", 5))
        );

        List<File> files = new ArrayList<>(Arrays.asList(
                new File("BVIFNqx98HWRWpQe", folderId, "report.docx", "other", 258),
                new File("tJTRbOQxEwjcpIrS", folderId, "photo.png", "image", 348)
        ));

        FileSystem.folders.putAll(
                folders.stream()
                        .collect(Collectors.toMap(FileSystemObject::getId, folder -> folder))
        );

        FileSystem.files.putAll(
                files.stream()
                        .collect(Collectors.toMap(FileSystemObject::getId, file -> file))
        );

        Token token = new Token();
        TokenService.token = token;

        GetFilesCommand command = new GetFilesCommand(token, folderId);
        GetFilesProcess process = new GetFilesProcess();

        List<FileSystemObject> folderContent = process.getFiles(command);

        assertWithMessage("The get files process should provide nested folders.")
                .that(folderContent)
                .containsAtLeastElementsIn(folders);

        assertWithMessage("The get files process should provide nested files.")
                .that(folderContent)
                .containsAtLeastElementsIn(files);
    }

    @DisplayName("throw Authentication errors.")
    @Test
    void testAuthenticationErrors() {

        TokenService.token = null;
        GetFilesProcess process = new GetFilesProcess();

        try {

            process.getFiles(new GetFilesCommand(new Token(), "root"));
        } catch (AuthenticationError e) {

            assertWithMessage("The get files process should throw an Authentication error if " +
                    "the stored token is null.")
                    .that(true)
                    .isTrue();
        } catch (Exception e) {

            assertWithMessage("The get files process should throw an Authentication error if " +
                    "the stored token is null.")
                    .that(false)
                    .isTrue();
        }

        TokenService.token = new Token();

        try {

            process.getFiles(new GetFilesCommand(new Token(), "root"));
        } catch (AuthenticationError e) {

            assertWithMessage("The get files process should throw an Authentication error if " +
                    "the stored token is different from the token from the command.")
                    .that(true)
                    .isTrue();
        } catch (Exception e) {

            assertWithMessage("The get files process should throw an Authentication error if " +
                    "the stored token is different from the token from the command.")
                    .that(false)
                    .isTrue();
        }
    }
}
