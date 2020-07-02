package io.javaclasses.filehub.storage;

/**
 * An identifier for a {@link StorageRecord}.
 */
public interface RecordId {

    /**
     * Provides the identifier value.
     *
     * @return The value of an identifier.
     */
    String value();
}
