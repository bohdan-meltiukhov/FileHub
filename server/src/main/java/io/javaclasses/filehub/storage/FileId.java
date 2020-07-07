package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;

/**
 * An identifier of a {@link FileMetadataRecord}.
 */
@Immutable
public final class FileId extends RecordId {

    /**
     * Creates an instance of the File identifier with set value.
     *
     * @param value The file identifier value.
     */
    protected FileId(String value) {

        super(value);
    }
}
