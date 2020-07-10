package io.javaclasses.filehub.api;

/**
 * An exception that should be raised in case a user tries to access a file or folder that doesn't exist.
 */
public class NotFoundException extends RuntimeException {

    /**
     * Creates an instance of the NotFoundException with set error message.
     *
     * @param message The message that describes the issue.
     */
    public NotFoundException(String message) {

        super(message);
    }
}
