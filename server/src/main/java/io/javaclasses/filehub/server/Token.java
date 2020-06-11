package io.javaclasses.filehub.server;

import java.util.Objects;

/**
 * The object for holding user tokens.
 */
public class Token {

    /**
     * The value of the token.
     */
    private final String value;

    /**
     * Creates an instance of the Token class.
     */
    public Token() {

        value = "my-token";
    }

    /**
     * The getter for the token value.
     *
     * @return The value of the token.
     */
    public String getValue() {
        return value;
    }

    /**
     * Indicates whether the provided object is a token with the same value.
     *
     * @param o The object to compare with.
     * @return True in case the tokens are equal.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Token token = (Token) o;
        return value.equals(token.value);
    }

    /**
     * Provides a hash code value for the token.
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
        return "Token: " + value;
    }
}
