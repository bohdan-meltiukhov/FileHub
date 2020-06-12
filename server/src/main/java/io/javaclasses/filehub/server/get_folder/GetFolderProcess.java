package io.javaclasses.filehub.server.get_folder;

import io.javaclasses.filehub.server.Folder;
import io.javaclasses.filehub.server.Token;

/**
 * The process for getting a particular folder.
 */
public class GetFolderProcess {

    /**
     * Returns a folder using the data from the provided command.
     *
     * @param command The command for getting a folder.
     * @return The required folder.
     */
    public Folder getFolder(GetFolderCommand command) {

        Token token = command.getToken();
        String folderId = command.getFolderId();

        return new Folder("root", "none", "Root", 5);
    }
}
