package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.FileMetadataRecord;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A value object for a name of a {@link FileMetadataRecord}
 */
@Immutable
public final class Filename {

    /**
     * The filename value.
     */
    private final String value;

    /**
     * Creates a Filename instance.
     *
     * @param value The filename value.
     */
    public Filename(String value) {

        this.value = checkNotNull(value);
    }

    /**
     * Provides a string representation of a file name.
     *
     * @return A string representation of a file name.
     */
    @Override
    public String toString() {
        return "Filename{" +
                "value='" + value + '\'' +
                '}';
    }

    /**
     * Indicates whether the provided object is a filename with the same value.
     *
     * @param o The object to compare with.
     * @return True in case both file names are equal.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof Filename)) return false;
        Filename filename = (Filename) o;
        return value.equals(filename.value);
    }

    /**
     * Provides a hash code value of a file name.
     *
     * @return The hash code that considers the filename value.
     */
    @Override
    public int hashCode() {

        return Objects.hash(value);
    }

    /**
     * Provides the file name value.
     *
     * @return The file name value.
     */
    public String value() {

        return value;
    }
}
