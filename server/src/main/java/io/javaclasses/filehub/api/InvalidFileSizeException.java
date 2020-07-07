package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FileMetadataRecord;

/**
 * An exception that should be raised when a {@link FileMetadataRecord} receives incorrect file size.
 */
public class InvalidFileSizeException extends RuntimeException {

    /**
     * Creates an instance of the InvalidFileSizeException with set error message.
     *
     * @param message The message that describes the issue.
     */
    public InvalidFileSizeException(String message) {

        super(message);
    }
}
