package io.javaclasses.filehub.api;

/**
 * An exception that should be thrown in case a user tries to register an account with username that already exists.
 */
public class UsernameAlreadyTakenException extends RuntimeException {

    /**
     * Creates an instance of the UsernameAlreadyTakenException with set error message.
     *
     * @param message The message that describes the issue.
     */
    public UsernameAlreadyTakenException(String message) {
        super(message);
    }
}
