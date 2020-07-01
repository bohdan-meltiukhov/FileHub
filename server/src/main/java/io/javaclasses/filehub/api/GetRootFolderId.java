package io.javaclasses.filehub.api;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link Command} that represents intention of a client to get the identifier of the root folder.
 */
public class GetRootFolderId implements Command {

    /**
     * The provided authentication token.
     */
    private final Token token;

    /**
     * Creates an instance of the GetRootFolderId command with set token.
     *
     * @param token The authentication token from the client.
     */
    public GetRootFolderId(Token token) {

        this.token = checkNotNull(token);
    }

    /**
     * Provides the command token.
     *
     * @return The stored authentication token.
     */
    public Token getToken() {

        return token;
    }
}
