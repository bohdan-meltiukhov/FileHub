package io.javaclasses.filehub.api;

/**
 * An exception that should be raised in case the user is not authenticated.
 */
public class UnauthorizedException extends RuntimeException {

    /**
     * Creates an instance of the UnauthorizedException with set error message.
     *
     * @param message The message that describes the issue.
     */
    public UnauthorizedException(String message) {

        super(message);
    }
}
