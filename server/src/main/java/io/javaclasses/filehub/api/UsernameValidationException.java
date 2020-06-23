package io.javaclasses.filehub.api;

/**
 * The error that can occur in case the username field violates the validation rules.
 */
public class UsernameValidationException extends RuntimeException {

    /**
     * Creates an instance of the username validation exception with set error message.
     *
     * @param message The message that describes the issue.
     */
    public UsernameValidationException(String message) {

        super(message);
    }
}
