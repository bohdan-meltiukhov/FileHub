package io.javaclasses.filehub.server;

import java.util.Objects;

/**
 * The value object for username.
 */
public final class Username {

    /**
     * The name of a current.
     */
    private final String value;

    /**
     * Creates an instance of the Username class with set value.
     *
     * @param value - The name of a user.
     */
    public Username(String value) {
        this.value = value;
    }

    /**
     * Provides a string representation of the username.
     *
     * @return A string representation of the username.
     */
    @Override
    public String toString() {

        return "Username: " + value;
    }

    /**
     * Indicates whether the provided object is a username and has the same value.
     *
     * @param o The object with which to compare.
     * @return True if the user names are equal.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Username)) return false;
        Username username = (Username) o;
        return value.equals(username.value);
    }

    /**
     * Provides a hash code value for the username.
     *
     * @return A hash code that considers the username value.
     */
    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

    /**
     * The getter for the username value.
     *
     * @return The stored username.
     */
    public String getValue() {
        return value;
    }
}
