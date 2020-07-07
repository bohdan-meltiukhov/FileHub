package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.InvalidFileSizeException;
import io.javaclasses.filehub.storage.FileMetadataRecord;

/**
 * A value object for the size of a {@link FileMetadataRecord} in bytes.
 */
@Immutable
public final class FileSize {

    /**
     * The size of a file in bytes.
     */
    private final int value;

    /**
     * Creates an instance of the file size.
     *
     * @param value The file size value in bytes.
     */
    public FileSize(int value) {

        if (value < 0) {

            throw new InvalidFileSizeException("The file size cannot be less than 0 bytes.");
        }

        this.value = value;
    }

    /**
     * Provides the file size value.
     *
     * @return The file size value.
     */
    public int value() {

        return value;
    }
}
