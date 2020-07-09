package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.UserRecord;

/**
 * An {@link Query} that contains information about an authenticated {@link UserRecord}.
 */
public abstract class AuthenticatedQuery implements Query {

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
