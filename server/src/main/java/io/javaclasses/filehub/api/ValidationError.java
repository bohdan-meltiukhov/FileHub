package io.javaclasses.filehub.api;

/**
 * The error that can occur during the registration process in case any of the fields violates the validation rules.
 */
public class ValidationError extends RuntimeException {

    /**
     * The field that contains an error.
     */
    private final String field;

    /**
     * Creates an instance of the validation error with set error message.
     *
     * @param field   The field with an error.
     * @param message The message that describes the issue.
     */
    public ValidationError(String field, String message) {

        super(message);
        this.field = field;
    }

    /**
     * Provides the error field.
     *
     * @return The field with an error.
     */
    public String field() {

        return field;
    }
}
