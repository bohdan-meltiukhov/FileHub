package io.javaclasses.filehub.server;

import java.util.Objects;

/**
 * The value object for a password.
 */
public final class Password {

    /**
     * The password for a user's account.
     */
    private final String value;

    /**
     * Creates an instance of the password object with set value.
     *
     * @param value The password for a user's account.
     */
    public Password(String value) {
        this.value = value;
    }

    /**
     * Provides a string representation of the password.
     *
     * @return A string representation of the password.
     */
    @Override
    public String toString() {

        return "Password:" + value;
    }

    /**
     * Indicates whether the provided object is a password and has the same value.
     *
     * @param o The object to compare with.
     * @return True in case the provided object is a password with the same value.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Password)) return false;
        Password password = (Password) o;
        return value.equals(password.value);
    }

    /**
     * Provides a hash code value for the password.
     *
     * @return The hash code that considers the password value.
     */
    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

    /**
     * The getter for the password value.
     *
     * @return The stored password.
     */
    public String getValue() {
        return value;
    }
}
