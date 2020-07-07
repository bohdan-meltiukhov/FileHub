package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.UserRecord;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * An {@link ApplicationProcess} that provides the current user.
 */
public class UserView implements View<GetUser, UserRecord> {

    /**
     * Checks the {@link GetUser} query and provides the current user.
     *
     * @param query The query from the client
     * @return The current user.
     */
    @Override
    public UserRecord process(GetUser query) {

        checkNotNull(query);

        return query.currentUser();
    }
}
