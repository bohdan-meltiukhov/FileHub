package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.UserRecord;

/**
 * A {@link Query} that represents intention of a client to get the identifier of the root folder.
 */
public class GetRootFolderId implements Query {

    /**
     * Provides the current user.
     *
     * @return The current user.
     */
    public UserRecord currentUser() {

        return CurrentUser.get();
    }
}
