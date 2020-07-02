package io.javaclasses.filehub.storage;

import io.javaclasses.filehub.api.Token;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * An in-memory storage for saving {@link TokenRecord}.
 */
public class TokenStorage extends InMemoryStorage<TokenId, TokenRecord> {

    /**
     * Provides a token record with the specified token. Returns null in case such record does not exist.
     *
     * @param token The required authentication token.
     * @return The required token record.
     */
    public TokenRecord get(Token token) {

        checkNotNull(token);

        return getAll().stream()
                .filter(tokenRecord -> tokenRecord.token().equals(token))
                .findFirst()
                .orElse(null);
    }
}
