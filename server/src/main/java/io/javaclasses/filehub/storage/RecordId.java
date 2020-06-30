package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;

import java.util.Objects;

/**
 * An identifier for a {@link StorageRecord}.
 */
@Immutable
public abstract class RecordId {

    /**
     * The identifier value.
     */
    private final String value;

    /**
     * Creates an instance of the Record ID class with set value.
     *
     * @param value The record identifier value.
     */
    protected RecordId(String value) {

        this.value = value;
    }

    /**
     * Indicates whether the provided object is a record ID and has the same value.
     *
     * @param o The object with with to compare.
     * @return True if the record identifiers are equal.
     */
    @Override
    public final boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof RecordId)) return false;
        RecordId recordId = (RecordId) o;
        return value.equals(recordId.value);
    }

    /**
     * Provides a hash code value for the record ID.
     *
     * @return A hash code that considers the recordId value.
     */
    @Override
    public final int hashCode() {

        return Objects.hash(value);
    }

    /**
     * Provides the identifier of the record.
     *
     * @return The stored identifier.
     */
    public String value() {

        return value;
    }

    /**
     * Provides a string representation of the record ID.
     *
     * @return A string representation of the record ID.
     */
    @Override
    public final String toString() {
        return "Record ID:" + value;
    }
}
