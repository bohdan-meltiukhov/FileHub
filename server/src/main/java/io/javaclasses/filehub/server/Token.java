package io.javaclasses.filehub.server;

import java.util.Objects;

/**
 * The object for holding user tokens.
 */
public class Token {

    /** The value of the token. */
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
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Token token = (Token) o;
        return value.equals(token.value);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {

        return Objects.hash(value);
    }

    /** {@inheritDoc} */
    @Override
    public String toString() {
        return "Token{" +
                "value='" + value + '\'' +
                '}';
    }
}
