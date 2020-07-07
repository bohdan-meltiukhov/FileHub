package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;

import java.util.Objects;

/**
 * A value object for a number of nested files and folders in a single {@link Folder}.
 */
@Immutable
public final class NestedItems {

    /**
     * The number of nested elements.
     */
    private final int value;

    /**
     * Creates an instance of the nested items class.
     *
     * @param value The number of nested items in a folder.
     */
    public NestedItems(int value) {

        if (value < 0) {

            throw new InvalidNumberOfNestedItemsException("A folder cannot contain less than 0 elements.");
        }

        this.value = value;
    }

    /**
     * Provides a string representation of a {@link NestedItems} object.
     *
     * @return A string representation of a {@link NestedItems} object.
     */
    @Override
    public String toString() {
        return "NestedItems{" +
                "value=" + value +
                '}';
    }

    /**
     * Indicated whether the provided object is a NestedItems instance with the same value.
     *
     * @param o The object to compare with.
     * @return True in case both objects are NestedItems instances with equal values.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof NestedItems)) return false;
        NestedItems that = (NestedItems) o;
        return value == that.value;
    }

    /**
     * Provides a hash code value of a {@link NestedItems} object.
     *
     * @return A hash code that considers the nested items value.
     */
    @Override
    public int hashCode() {

        return Objects.hash(value);
    }

    /**
     * Provides the nested items value.
     *
     * @return The nested items value.
     */
    public int value() {

        return value;
    }
}
