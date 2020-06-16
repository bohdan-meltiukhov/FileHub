package io.javaclasses.filehub.server.register;

/**
 * The error that can occur during the registration process in case any of the fields violates the validation rules.
 */
public class ValidationError extends RuntimeException {

    /**
     * Creates an instance of the validation error with set error message.
     *
     * @param message The message that describes the issue.
     */
    public ValidationError(String message) {
        super(message);
    }
}
