package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.FileMetadataRecord;

import java.util.Objects;

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
     * Provides a string representation of a file size.
     *
     * @return A string representation of a file size.
     */
    @Override
    public String toString() {
        return "FileSize{" +
                "value=" + value +
                '}';
    }

    /**
     * Indicates whether the provided object is a FileSize with the same value.
     *
     * @param o The object to compare with.
     * @return True if both objects are file sizes with equal values.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof FileSize)) return false;
        FileSize fileSize = (FileSize) o;
        return value == fileSize.value;
    }

    /**
     * Provides a hash code value of a file size.
     *
     * @return A hash code value of a file size.
     */
    @Override
    public int hashCode() {

        return Objects.hash(value);
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
