package io.javaclasses.filehub.server.get_files;

import io.javaclasses.filehub.server.FileSystemObject;
import io.javaclasses.filehub.server.Token;

import java.util.ArrayList;
import java.util.List;

/**
 * The process for getting the content of a folder.
 */
public class GetFilesProcess {

    /**
     * Returns the content of a folder using the provided command.
     *
     * @param command The command that contains the token and the ID of the required folder.
     * @return Files and folders located in the needed folder.
     */
    public List<FileSystemObject> getFiles(GetFilesCommand command) {

        Token token = command.getToken();
        String folderId = command.getFolderId();

        return new ArrayList<>();
    }
}
