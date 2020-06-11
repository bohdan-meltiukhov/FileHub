package io.javaclasses.filehub.server.create_folder;

import io.javaclasses.filehub.server.Folder;

/**
 * The process for creating folders.
 */
public class CreateFolderProcess {

    /**
     * Creates a folder using the provided command.
     *
     * @param command The command with necessary data for creating the folder.
     * @return The created folder.
     */
    public Folder createFolder(CreateFolderCommand command) {

        return new Folder("1ksndn", "root", "New Folder", 0);
    }
}
