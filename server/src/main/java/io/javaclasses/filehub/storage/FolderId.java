package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * An identifier of a {@link FolderMetadataRecord}.
 */
@Immutable
public final class FolderId extends RecordId {

    /**
     * Creates an instance of the folder identifier with set value.
     *
     * @param value The folder identifier value.
     */
    public FolderId(String value) {

        super(checkNotNull(value));
    }
}
