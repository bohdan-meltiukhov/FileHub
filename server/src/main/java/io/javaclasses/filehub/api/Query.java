package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.UserRecord;

/**
 * An abstract base which represents intention of a client to retrieve any data from the FileHub application.
 */
public abstract class Query {

    /**
     * Provides the current user of the FileHub application.
     *
     * @return The current user.
     */
    public UserRecord currentUser() {

        return CurrentUser.get();
    }
}
