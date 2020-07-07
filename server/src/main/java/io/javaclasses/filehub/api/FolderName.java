package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.FolderMetadataRecord;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A value object for a name of a {@link FolderMetadataRecord}
 */
@Immutable
public final class FolderName {

    /**
     * The folder name value.
     */
    private final String value;

    /**
     * Creates a folder name instance.
     *
     * @param value The folder name value.
     */
    public FolderName(String value) {

        this.value = checkNotNull(value);
    }

    /**
     * Provides a string representation of a folder name.
     *
     * @return A string representation of a folder name.
     */
    @Override
    public String toString() {
        return "FolderName{" +
                "value='" + value + '\'' +
                '}';
    }

    /**
     * Indicates whether the provided object is a folder name with the same value.
     *
     * @param o The object to compare with.
     * @return True in case both folder names are equal.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof FolderName)) return false;
        FolderName folderName = (FolderName) o;
        return value.equals(folderName.value);
    }

    /**
     * Provides a hash code value of a folder name.
     *
     * @return The hash code that considers the folder name value.
     */
    @Override
    public int hashCode() {

        return Objects.hash(value);
    }

    /**
     * Provides the folder name value.
     *
     * @return The folder name value.
     */
    public String value() {

        return value;
    }
}
