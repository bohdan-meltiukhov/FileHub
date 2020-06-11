package io.javaclasses.filehub.server.authenticate;

/**
 * The class for errors that occur during the authentication process.
 */
public class AuthenticationError extends Exception {

    /**
     * Creates an instance of the AuthenticationError with set error message.
     *
     * @param message The message that describes the issue.
     */
    public AuthenticationError(String message) {
        super(message);
    }
}
