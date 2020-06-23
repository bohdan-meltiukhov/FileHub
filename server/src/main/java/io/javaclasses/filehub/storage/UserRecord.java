package io.javaclasses.filehub.storage;

import io.javaclasses.filehub.api.PasswordHash;
import io.javaclasses.filehub.api.Username;

import java.util.Objects;

public class UserRecord implements Record<UserId> {

    /**
     * The identifier of a user.
     */
    private final UserId userId;

    /**
     * The name of the user.
     */
    private final Username username;

    /**
     * The user's password hash.
     */
    private final PasswordHash passwordHash;

    /**
     * Creates an instance of the user record with set user ID, username and password hash.
     *
     * @param userId       The identifier of a user.
     * @param username     The name of the user.
     * @param passwordHash The password hash of the user.
     */
    public UserRecord(UserId userId, Username username, PasswordHash passwordHash) {

        this.userId = userId;
        this.username = username;
        this.passwordHash = passwordHash;
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
                passwordHash.equals(that.passwordHash);
    }

    /**
     * Provides the hash code value of the user record.
     *
     * @return The hash code value that considers the user ID, username and password hash.
     */
    @Override
    public int hashCode() {

        return Objects.hash(userId, username, passwordHash);
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
                ", passwordHash=" + passwordHash +
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
    public PasswordHash passwordHash() {

        return passwordHash;
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
