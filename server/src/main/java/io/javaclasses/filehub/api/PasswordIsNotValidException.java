package io.javaclasses.filehub.api;

/**
 * The exception that should be raised in case the password field violates the validation rules.
 */
public class PasswordIsNotValidException extends RuntimeException {

    /**
     * Creates an instance of the password validation exception with set error message.
     *
     * @param message The message that describes the issue.
     */
    public PasswordIsNotValidException(String message) {

        super(message);
    }
}
