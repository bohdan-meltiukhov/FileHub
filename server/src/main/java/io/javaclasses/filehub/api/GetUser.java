package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link Command} that represents intention of a client to get the current user.
 */
@Immutable
public class GetUser implements Command {

    /**
     * The provided authentication token.
     */
    private final Token token;

    /**
     * Creates an instance of the GetUser command.
     *
     * @param token The authentication token from the client.
     */
    public GetUser(Token token) {

        this.token = checkNotNull(token);
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
