package io.javaclasses.filehub.storage;

import io.javaclasses.filehub.api.CredentialsAreNotValidException;
import io.javaclasses.filehub.api.Username;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The in-memory storage for user records.
 */
public class UserStorage extends InMemoryStorage<UserId, UserRecord> {

    private static final Logger logger = LoggerFactory.getLogger(UserStorage.class);

    /**
     * Indicates whether the user storage contain a user with the corresponding username or not.
     *
     * @param username The username to check.
     * @return True in case there is a user with the provided name in the storage.
     */
    public boolean contains(Username username) {

        checkNotNull(username);

        if (logger.isDebugEnabled()) {
            logger.debug("Checking if username {} already exists.", username);
        }
        return getAll().stream()
                .anyMatch(userRecord -> userRecord.username().equals(username));
    }

    /**
     * Indicates whether the user storage contains a user record with provided username and password.
     *
     * @param username The username to check.
     * @param password The password to check.
     * @return True in case a user record with the specified username and password exists.
     */
    public boolean contains(Username username, String password) {

        checkNotNull(username);
        checkNotNull(password);

        if (logger.isDebugEnabled()) {
            logger.debug("Checking if a user with username {} and password {} exists.", username, password);
        }

        return getAll().stream()
                .anyMatch(userRecord -> userRecord.username().equals(username) &&
                        userRecord.hashedPassword().equals(password));
    }

    /**
     * Provides a user record with the specified username.
     *
     * @param username The name of the required user record.
     * @return The required user record.
     */
    public UserRecord get(Username username) {

        checkNotNull(username);

        if (logger.isDebugEnabled()) {
            logger.debug("Getting a user with name {}.", username);
        }

        return getAll().stream()
                .filter(userRecord -> userRecord.username().equals(username))
                .findFirst()
                .orElseThrow(() -> new CredentialsAreNotValidException("The username or password are invalid."));
    }
}
