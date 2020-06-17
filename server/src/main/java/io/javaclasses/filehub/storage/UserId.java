package io.javaclasses.filehub.storage;

import java.util.Objects;

/**
 * The identifier of a user.
 */
public class UserId implements RecordId {

    /**
     * The identifier of a user.
     */
    private final String id;

    /**
     * Creates an instance of the user ID with set identifier.
     *
     * @param id The identifier of a user.
     */
    public UserId(String id) {

        this.id = id;
    }

    /**
     * Provides a string representation of a user ID.
     *
     * @return A string representation of a user ID.
     */
    @Override
    public String toString() {

        return "UserId:" + id;
    }

    /**
     * Indicates whether the provided object is a user ID and has the same value.
     *
     * @param o The object with with to compare.
     * @return True if the user names are equal.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserId userId = (UserId) o;
        return id.equals(userId.id);
    }

    /**
     * Provides a hash code value for the user ID.
     *
     * @return A hash code that considers the userId value.
     */
    @Override
    public int hashCode() {

        return Objects.hash(id);
    }

    /**
     * Provides the identifier of the user.
     *
     * @return The stored identifier.
     */
    public String id() {

        return id;
    }
}
