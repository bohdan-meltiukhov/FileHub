package io.javaclasses.filehub.api;

/**
 * An exception that should be raised in case the user's login credentials are invalid.
 */
public class CredentialsAreNotValidException extends RuntimeException {

    /**
     * Creates an instance of the CredentialsAreNotValidException with set error message.
     *
     * @param message The message that describes the issue.
     */
    public CredentialsAreNotValidException(String message) {

        super(message);
    }
}
