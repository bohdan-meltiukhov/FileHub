package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.UserRecord;

/**
 * A {@link Command} that contains information about an authenticated {@link UserRecord}.
 *
 * <p>This command should be extended in case the information about the current user is required.
 */
public abstract class AuthenticatedCommand implements Command {

    /**
     * Provides the current user of the FileHub application.
     *
     * @return The current user.
     * @throws CurrentUserUnknownException in case the current user is unknown.
     */
    public UserRecord currentUser() {

        UserRecord currentUser = CurrentUser.get();
        if (currentUser == null) {

            throw new CurrentUserUnknownException("The current user is unknown.");
        }

        return currentUser;
    }
}
