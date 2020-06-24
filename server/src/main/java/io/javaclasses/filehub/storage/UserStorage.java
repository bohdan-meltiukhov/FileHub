package io.javaclasses.filehub.storage;

import io.javaclasses.filehub.api.Username;
import jdk.nashorn.internal.ir.annotations.Immutable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The in-memory storage for user records.
 */
@Immutable
public class UserStorage extends InMemoryStorage<UserId, UserRecord> {

    /**
     * Indicates whether the user storage contain a user with the corresponding username or not.
     *
     * @param username The username to check.
     * @return True in case there is a user with the provided name in the storage.
     */
    public boolean containsUsername(Username username) {

        Logger logger = LoggerFactory.getLogger(UserStorage.class);

        if (logger.isDebugEnabled()) {
            logger.debug("Checking if username {} already exists.", username);
        }
        return getAll().stream()
                .anyMatch(userRecord -> userRecord.username().equals(username));
    }
}
