package io.javaclasses.filehub.storage;

import java.time.LocalDateTime;
import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link StorageRecord} for saving {@link Token}.
 */
public final class LoggedInUser implements StorageRecord<Token> {

    /**
     * The authentication token.
     */
    private final Token token;

    /**
     * An identifier of the user of the token.
     */
    private final UserId userId;

    /**
     * The date when the token expires.
     */
    private final LocalDateTime expirationDate;

    /**
     * Creates an instance of the token record with set properties.
     *
     * @param token          The authentication token itself.
     * @param userId         An identifier of the user of the token.
     * @param expirationDate The date when the token expires.
     */
    public LoggedInUser(Token token, UserId userId, LocalDateTime expirationDate) {

        this.token = checkNotNull(token);
        this.userId = checkNotNull(userId);
        this.expirationDate = checkNotNull(expirationDate);
    }

    /**
     * Identifies whether the provided object is a  token record with the same fields.
     *
     * @param o The object to compare with.
     * @return True in case both objects are token records with the same fields.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof LoggedInUser)) return false;
        LoggedInUser that = (LoggedInUser) o;
        return token.equals(that.token) &&
                userId.equals(that.userId) &&
                expirationDate.equals(that.expirationDate);
    }

    /**
     * Provides the hash code value of a token record.
     *
     * @return A hash code value that considers the token record fields.
     */
    @Override
    public int hashCode() {

        return Objects.hash(token, userId, expirationDate);
    }

    /**
     * Provides a string representation of the token record.
     *
     * @return A string representation of the token record.
     */
    @Override
    public String toString() {

        return "TokenRecord{" +
                "token=" + token +
                ", userId=" + userId +
                ", expirationDate=" + expirationDate +
                '}';
    }

    /**
     * The getter for the token.
     *
     * @return The stored authentication token.
     */
    public Token id() {

        return token;
    }

    /**
     * The getter for the user identifier.
     *
     * @return The stored user identifier.
     */
    public UserId userId() {

        return userId;
    }

    /**
     * The getter for the expiration date.
     *
     * @return The stored expiration date.
     */
    public LocalDateTime expirationDate() {

        return expirationDate;
    }
}
