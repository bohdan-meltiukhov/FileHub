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
     * @throws CurrentUserNotSetException in case the current user is unknown.
     */
    public UserRecord currentUser() {

        UserRecord currentUser = CurrentUser.get();
        if (currentUser == null) {

            throw new CurrentUserNotSetException("The current user was not set by the Authentication Filter.");
        }

        return currentUser;
    }
}
