package io.javaclasses.filehub.api;

/**
 * The error that should be raised in case the username is invalid.
 */
public class UsernameIsNotValidException extends RuntimeException {

    /**
     * Creates an instance of the username validation exception with set error message.
     *
     * @param message The message that describes the issue.
     */
    public UsernameIsNotValidException(String message) {

        super(message);
    }
}
