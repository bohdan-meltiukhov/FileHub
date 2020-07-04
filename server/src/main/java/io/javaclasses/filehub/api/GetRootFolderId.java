package io.javaclasses.filehub.api;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link Query} that represents intention of a client to get the identifier of the root folder.
 */
public class GetRootFolderId implements Query {

    /**
     * The provided authentication token.
     */
    private final Token token;

    /**
     * Creates an instance of the GetRootFolderId query with set token.
     *
     * @param token The authentication token from the client.
     */
    public GetRootFolderId(Token token) {

        this.token = checkNotNull(token);
    }

    /**
     * Provides a string representation of the command.
     *
     * @return A string representation of the command.
     */
    @Override
    public String toString() {

        return "GetRootFolderId{" +
                "token=" + token +
                '}';
    }

    /**
     * Provides the command token.
     *
     * @return The stored authentication token.
     */
    public Token token() {

        return token;
    }
}
