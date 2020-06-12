package io.javaclasses.filehub.server.get_files;

import io.javaclasses.filehub.server.Token;

/**
 * The command that stores the authentication token and the folder ID for the get files process.
 */
public class GetFilesCommand {

    /**
     * The authentication token provided by the user.
     */
    private final Token token;

    /**
     * The identifier of the required folder.
     */
    private final String folderId;

    /**
     * Creates an instance of the get files command with set token and folder ID.
     *
     * @param token    The token provided by the client.
     * @param folderId The ID of the required folder.
     */
    public GetFilesCommand(Token token, String folderId) {

        this.token = token;
        this.folderId = folderId;
    }

    /**
     * Provides the command token.
     *
     * @return The stored authentication token.
     */
    Token getToken() {

        return token;
    }

    /**
     * Provides the command folder ID.
     *
     * @return The stored folder ID.
     */
    String getFolderId() {

        return folderId;
    }
}
