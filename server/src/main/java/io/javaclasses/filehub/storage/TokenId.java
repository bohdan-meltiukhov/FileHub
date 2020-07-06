package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.Token;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * An identifier of a {@link Token}.
 */
@Immutable
public final class TokenId extends RecordId {

    /**
     * Creates an instance of the token identifier with set value.
     *
     * @param value The token identifier value.
     */
    public TokenId(String value) {

        super(checkNotNull(value));
    }
}
