package io.javaclasses.filehub.api;

/**
 * An exception that should be raised when the FileHub application fails to identify the current user.
 */
public class CurrentUserNotSetException extends RuntimeException {

    /**
     * Creates a CurrentUserNotSetException with set message.
     *
     * @param message The message that describes the issue.
     */
    public CurrentUserNotSetException(String message) {
        super(message);
    }
}
