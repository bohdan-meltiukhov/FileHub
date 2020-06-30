package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The identifier of a user.
 */
@Immutable
public final class UserId implements RecordId {

    /**
     * The identifier of a user.
     */
    private final String value;

    /**
     * Creates an instance of the user ID with set identifier.
     */
    public UserId(String value) {

        this.value = checkNotNull(value);
    }

    /**
     * Provides a string representation of a user ID.
     *
     * @return A string representation of a user ID.
     */
    @Override
    public String toString() {

        return "UserId:" + value;
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
        if (!(o instanceof UserId)) return false;
        UserId userId = (UserId) o;
        return value.equals(userId.value);
    }

    /**
     * Provides a hash code value for the user ID.
     *
     * @return A hash code that considers the userId value.
     */
    @Override
    public int hashCode() {

        return Objects.hash(value);
    }

    /**
     * Provides the identifier of the user.
     *
     * @return The stored identifier.
     */
    @Override
    public String value() {

        return value;
    }
}
