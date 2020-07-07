package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A value object for authentication tokens.
 *
 * <p>A token is a secure string used to identify and authorize users.
 */
@Immutable
public final class Token extends RecordId {

    /**
     * Creates an instance of the Token class with set value.
     *
     * @param value The record identifier value.
     */
    public Token(String value) {
        super(checkNotNull(value));
    }
}
