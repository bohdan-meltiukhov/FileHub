package io.javaclasses.filehub.storage;

import io.javaclasses.filehub.api.Username;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The in-memory storage for user records.
 */
public class UserStorage extends InMemoryStorage<UserId, UserRecord> {

    /**
     * Indicates whether the user storage contain a user with the corresponding username or not.
     *
     * @param username The username to check.
     * @return True in case there is a user with the provided name in the storage.
     */
    public boolean contains(Username username) {

        checkNotNull(username);

        Logger logger = LoggerFactory.getLogger(UserStorage.class);

        if (logger.isDebugEnabled()) {
            logger.debug("Checking if username {} already exists.", username);
        }
        return getAll().stream()
                .anyMatch(userRecord -> userRecord.username().equals(username));
    }
}
