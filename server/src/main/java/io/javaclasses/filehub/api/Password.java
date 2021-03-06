package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A value object for a user password.
 */
@Immutable
public final class Password {

    /**
     * The password value as it is.
     */
    private final String value;

    /**
     * Creates an instance of the password object with set value.
     *
     * @param value The password for a user's account.
     */
    public Password(String value) {

        checkNotNull(value);

        if (value.length() < 8) {

            throw new PasswordIsNotValidException("The password should have at least 8 characters.");
        }

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
    public String value() {

        return value;
    }
}
