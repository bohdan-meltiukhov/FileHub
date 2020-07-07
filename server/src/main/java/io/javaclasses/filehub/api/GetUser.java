package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.UserRecord;

/**
 * A {@link Query} that represents intention of a client to get the current user.
 */
@Immutable
public class GetUser implements Query {

    /**
     * Provides the current user.
     *
     * @return The current FileHub user.
     */
    public UserRecord currentUser() {

        return CurrentUser.get();
    }
}
