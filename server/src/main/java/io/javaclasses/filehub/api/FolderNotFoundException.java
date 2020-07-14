package io.javaclasses.filehub.api;

/**
 * An exception that should be raised in case a user tries to access a folder that doesn't exist.
 */
public class FolderNotFoundException extends RuntimeException {

    /**
     * Creates an instance of the FolderNotFoundException with set error message.
     *
     * @param message The message that describes the issue.
     */
    public FolderNotFoundException(String message) {

        super(message);
    }
}
