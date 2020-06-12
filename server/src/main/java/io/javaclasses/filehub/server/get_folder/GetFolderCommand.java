package io.javaclasses.filehub.server.get_folder;

import io.javaclasses.filehub.server.Token;

/**
 * The command that stored the authentication token and the folder ID for the get folder process.
 */
public class GetFolderCommand {

    /**
     * The authentication token provided by te client.
     */
    private final Token token;

    /**
     * The identifier of the required folder.
     */
    private final String folderId;

    /**
     * Creates an instance of the get folder command with set token and folder ID.
     *
     * @param token    The authentication token from the client.
     * @param folderId The ID of the required folder.
     */
    public GetFolderCommand(Token token, String folderId) {

        this.token = token;
        this.folderId = folderId;
    }

    /**
     * Provides the token of the command.
     *
     * @return The stored authentication token.
     */
    Token getToken() {

        return token;
    }

    /**
     * Provides the folder ID of the command.
     *
     * @return The stored folder ID.
     */
    String getFolderId() {

        return folderId;
    }
}
