package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.Username;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link StorageRecord} about a particular user. Should be saved in a {@link UserStorage}.
 */
@Immutable
public final class UserRecord implements StorageRecord<UserId> {

    /**
     * The identifier of a user.
     */
    private final UserId userId;

    /**
     * The name of the user.
     */
    private final Username username;

    /**
     * The user's hashed password.
     */
    private final String hashedPassword;

    /**
     * Creates an instance of the user record.
     *
     * @param userId         The identifier of a user.
     * @param username       The name of the user.
     * @param hashedPassword The password hash of the user.
     */
    public UserRecord(UserId userId, Username username, String hashedPassword) {

        this.userId = checkNotNull(userId);
        this.username = checkNotNull(username);
        this.hashedPassword = checkNotNull(hashedPassword);
    }

    /**
     * Indicates whether the provided object is a user record with the same ID, username and password hash.
     *
     * @param o The object to compare with.
     * @return True if user records are equal.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof UserRecord)) return false;
        UserRecord that = (UserRecord) o;
        return userId.equals(that.userId) &&
                username.equals(that.username) &&
                hashedPassword.equals(that.hashedPassword);
    }

    /**
     * Provides the hash code value of the user record.
     *
     * @return The hash code value that considers the user ID, username and password hash.
     */
    @Override
    public int hashCode() {

        return Objects.hash(userId, username, hashedPassword);
    }

    /**
     * Provides a string representation of the user record.
     *
     * @return A string representation of the user record.
     */
    @Override
    public String toString() {
        return "UserRecord{" +
                "userId=" + userId +
                ", username=" + username +
                ", passwordHash=" + hashedPassword +
                '}';
    }

    /**
     * The getter for the user name.
     *
     * @return The name of the user.
     */
    public Username username() {

        return username;
    }

    /**
     * The getter for the password hash.
     *
     * @return The password hash of the user.
     */
    public String hashedPassword() {

        return hashedPassword;
    }

    /**
     * Provides the identifier of the user.
     *
     * @return The identifier of the current user.
     */
    @Override
    public UserId id() {

        return userId;
    }
}
