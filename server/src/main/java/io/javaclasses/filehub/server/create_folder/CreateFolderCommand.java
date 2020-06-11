package io.javaclasses.filehub.server.create_folder;

import io.javaclasses.filehub.server.Token;

/**
 * The command that stores the authentication token and the parent folder ID for the create folder process.
 */
public class CreateFolderCommand {

    /**
     * The token provided by the user.
     */
    private final Token token;

    /**
     * The identifier of the parent folder for the new one.
     */
    private final String parentId;

    /**
     * Creates an instance of the create folder command with set token and parent ID.
     *
     * @param token    The token the user provided during the create folder process.
     * @param parentId The identifier of the parent folder for the new one.
     */
    public CreateFolderCommand(Token token, String parentId) {

        this.token = token;
        this.parentId = parentId;
    }

    /**
     * Provides the command token.
     *
     * @return The stored token.
     */
    Token getToken() {

        return token;
    }

    /**
     * Provides the command parent ID.
     *
     * @return The ID of the parent folder for the new folder.
     */
    String getParentId() {

        return parentId;
    }
}
