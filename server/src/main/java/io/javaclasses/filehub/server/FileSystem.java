package io.javaclasses.filehub.server;

import java.util.HashMap;
import java.util.Map;

/**
 * Stores all files and folders.
 */
public class FileSystem {

    /**
     * The map of all stored files.
     *
     * <p>The key is the file ID and the value is the corresponding file.
     */
    public static Map<String, File> files = new HashMap<>();

    /**
     * The map of all stored folders.
     *
     * <p>The key as the folder ID and the value is the corresponding folder.
     */
    public static Map<String, Folder> folders = new HashMap<>();
}
