package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;

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
     * Provides the nested items value.
     *
     * @return The nested items value.
     */
    public int value() {

        return value;
    }
}
