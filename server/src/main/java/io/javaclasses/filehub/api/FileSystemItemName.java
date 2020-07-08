package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.FileMetadataRecord;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A value object for a name of a {@link FileMetadataRecord}
 */
@Immutable
public final class FileSystemItemName {

    /**
     * The file system item name value.
     */
    private final String value;

    /**
     * Creates a FileSystemItemName instance.
     *
     * @param value The name value.
     */
    public FileSystemItemName(String value) {

        this.value = checkNotNull(value);
    }

    /**
     * Provides a string representation of a FileSystemItemName.
     *
     * @return A string representation of a FileSystemItemName.
     */
    @Override
    public String toString() {
        return "Filename{" +
                "value='" + value + '\'' +
                '}';
    }

    /**
     * Indicates whether the provided object is a FileSystemItemName with the same value.
     *
     * @param o The object to compare with.
     * @return True in case both names are equal.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof FileSystemItemName)) return false;
        FileSystemItemName name = (FileSystemItemName) o;
        return value.equals(name.value);
    }

    /**
     * Provides a hash code value of a FileSystemItemName.
     *
     * @return The hash code that considers the name value.
     */
    @Override
    public int hashCode() {

        return Objects.hash(value);
    }

    /**
     * Provides the FileSystemItemName value.
     *
     * @return The FileSystemItemName value.
     */
    public String value() {

        return value;
    }
}
