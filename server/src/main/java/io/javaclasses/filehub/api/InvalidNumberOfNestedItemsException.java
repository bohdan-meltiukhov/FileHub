package io.javaclasses.filehub.api;

/**
 * An exception that should be raised when a {@link Folder} receives incorrect number of nested items
 * {@link NestedItems}.
 */
public class InvalidNumberOfNestedItemsException extends RuntimeException {

    /**
     * Creates an instance of the InvalidNumberOfNestedItemsException with set error message.
     *
     * @param message The message that describes the issue.
     */
    public InvalidNumberOfNestedItemsException(String message) {

        super(message);
    }
}
