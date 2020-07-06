package io.javaclasses.filehub.api;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link Query} that represents intention of a client to get the identifier of the root folder.
 */
public class GetRootFolderId implements Query {

    /**
     * The current user of the application.
     */
    private final CurrentUser currentUser;

    /**
     * Creates an instance of the GetRootFolderId query.
     *
     * @param currentUser The current user of the application.
     */
    public GetRootFolderId(CurrentUser currentUser) {

        this.currentUser = checkNotNull(currentUser);
    }

    /**
     * Provides a string representation of the command.
     *
     * @return A string representation of the command.
     */
    @Override
    public String toString() {
        return "GetRootFolderId{" +
                "currentUser=" + currentUser +
                '}';
    }

    /**
     * Provides the current user.
     *
     * @return The current user.
     */
    public CurrentUser currentUser() {

        return currentUser;
    }
}
