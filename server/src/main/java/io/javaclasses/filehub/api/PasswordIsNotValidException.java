package io.javaclasses.filehub.api;

/**
 * The exception that should be raised in case the user password is invalid.
 */
public class PasswordIsNotValidException extends RuntimeException {

    /**
     * Creates an instance of the password validation exception.
     *
     * @param message The message that describes the issue.
     */
    public PasswordIsNotValidException(String message) {

        super(message);
    }
}
