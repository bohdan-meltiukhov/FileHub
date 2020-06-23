package io.javaclasses.filehub.api;

/**
 * The exception that can occur in case the password field violates the validation rules.
 */
public class PasswordValidationException extends RuntimeException {

    /**
     * Creates an instance of the password validation exception with set error message.
     *
     * @param message The message that describes the issue.
     */
    public PasswordValidationException(String message) {

        super(message);
    }
}
