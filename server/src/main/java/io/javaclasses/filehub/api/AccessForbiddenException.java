package io.javaclasses.filehub.api;

/**
 * An exception that should be raised in case a user tries to access a folder they don't have access to.
 */
public class AccessForbiddenException extends RuntimeException {

    /**
     * Creates an instance of the AccessForbiddenException with set error message.
     *
     * @param message The message that describes the issue.
     */
    public AccessForbiddenException(String message) {

        super(message);
    }
}
