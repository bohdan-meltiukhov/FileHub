package io.javaclasses.filehub.storage;

/**
 * An identifier of a {@link FileMetadataRecord}.
 */
public class FileId extends RecordId {
    /**
     * Creates an instance of the File identifier with set value.
     *
     * @param value The file identifier value.
     */
    protected FileId(String value) {

        super(value);
    }
}
