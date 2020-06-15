package io.javaclasses.filehub.server.create_folder;

import io.javaclasses.filehub.server.FileSystem;
import io.javaclasses.filehub.server.Folder;
import io.javaclasses.filehub.server.TokenService;
import io.javaclasses.filehub.server.authenticate.AuthenticationError;

import java.util.UUID;

/**
 * The process for creating folders.
 */
public class CreateFolderProcess {

    /**
     * Creates a folder using the provided command and adds it to the file manager.
     *
     * @param command The command with necessary data for creating the folder.
     * @return The created folder.
     */
    public Folder createFolder(CreateFolderCommand command) throws AuthenticationError {

        if (TokenService.token == null || !TokenService.token.equals(command.getToken())) {

            throw new AuthenticationError("Not authorized.");
        }

        String newId = UUID.randomUUID().toString();

        Folder folder = new Folder(newId, command.getParentId(), "New folder", 0);

        FileSystem.folders.put(newId, folder);

        return folder;
    }
}
