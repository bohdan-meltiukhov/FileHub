package io.javaclasses.filehub.api;

import java.util.List;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A data transfer object for a content of a {@link Folder}.
 */
public class FolderContent {

    /**
     * A list of nested folders.
     */
    private final List<Folder> folders;

    /**
     * A list of nested files.
     */
    private final List<File> files;

    /**
     * Creates an instance of the folder content.
     *
     * @param folders A list of nested folders.
     * @param files   A list of nested files.
     */
    public FolderContent(List<Folder> folders, List<File> files) {

        this.folders = checkNotNull(folders);
        this.files = checkNotNull(files);
    }

    /**
     * A getter for the nested folders.
     *
     * @return The stored folders.
     */
    public List<Folder> folders() {

        return folders;
    }

    /**
     * A getter for the nested files.
     *
     * @return The stored files.
     */
    public List<File> files() {

        return files;
    }
}
