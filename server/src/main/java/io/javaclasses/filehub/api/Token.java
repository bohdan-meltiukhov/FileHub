package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A value object for for authentication tokens.
 *
 * <p>A token is a secure string used to identify and authorize users.
 */
@Immutable
public final class Token {

    /**
     * The authentication token value.
     */
    private final String value;

    /**
     * Creates an instance of the token with set value.
     *
     * @param value The token value.
     */
    public Token(String value) {

        this.value = checkNotNull(value);
    }

    /**
     * The getter for the token value.
     *
     * @return The token value.
     */
    public String value() {

        return value;
    }

    /**
     * Indicates whether the provided object is a Token with the same value.
     *
     * @param o The object to compare with.
     * @return True in case the tokens have the same value.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof Token)) return false;
        Token token = (Token) o;
        return value.equals(token.value);
    }

    /**
     * Provides a hash code value of a token.
     *
     * @return A hash code that considers the token value.
     */
    @Override
    public int hashCode() {

        return Objects.hash(value);
    }

    /**
     * Provides a string representation of the token.
     *
     * @return A string representation of the token.
     */
    @Override
    public String toString() {

        return "Token:" + value;
    }
}
