package io.javaclasses.filehub.server.get_files;

import io.javaclasses.filehub.server.*;
import io.javaclasses.filehub.server.authenticate.AuthenticationError;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<FileSystemObject> getFiles(GetFilesCommand command) throws AuthenticationError {

        if (TokenService.token == null || !TokenService.token.equals(command.getToken())) {

            throw new AuthenticationError("Not authorized.");
        }

        String folderId = command.getFolderId();

        List<Folder> folders = FileSystem.folders.values()
                .stream()
                .filter(folder -> folder.getParentId().equals(folderId))
                .collect(Collectors.toList());

        List<File> files = FileSystem.files.values()
                .stream()
                .filter(file -> file.getParentId().equals(folderId))
                .collect(Collectors.toList());

        List<FileSystemObject> folderContent = new ArrayList<>();
        folderContent.addAll(folders);
        folderContent.addAll(files);

        return folderContent;
    }
}
