package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The identifier of a {@link UserRecord}.
 */
@Immutable
public final class UserId extends RecordId {

    /**
     * Creates an instance of the user ID with set identifier.
     */
    public UserId(String value) {

        super(checkNotNull(value));
    }
}
