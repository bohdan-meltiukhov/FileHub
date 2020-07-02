package io.javaclasses.filehub.storage;

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
     * Provides a user record with the specified username and password. Returns null if there is no such user.
     *
     * @param username The name of the required user record.
     * @param password The password of the needed user.
     * @return The required user record.
     */
    public UserRecord get(Username username, String password) {

        checkNotNull(username);
        checkNotNull(password);

        if (logger.isDebugEnabled()) {
            logger.debug("Getting a user with name {} and password.", username);
        }

        return getAll().stream()
                .filter(userRecord -> userRecord.username().equals(username) &&
                        userRecord.hashedPassword().equals(password))
                .findFirst()
                .orElse(null);
    }
}
