package io.javaclasses.filehub.storage;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * An in-memory storage for saving {@link LoggedInUser}.
 */
public class LoggedInUserStorage extends InMemoryStorage<Token, LoggedInUser> {

    /**
     * Provides a token record with the specified token. Returns null in case such record does not exist.
     *
     * @param token The required authentication token.
     * @return The required token record.
     */
    public LoggedInUser get(Token token) {

        checkNotNull(token);

        return getAll().stream()
                .filter(tokenRecord -> tokenRecord.id().equals(token))
                .findFirst()
                .orElse(null);
    }
}
