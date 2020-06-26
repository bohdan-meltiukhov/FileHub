package io.javaclasses.filehub.storage;

/**
 * A data structure to save in a {@link Storage}.
 *
 * @param <I> The type of the record identifier.
 */
public interface StorageRecord<I extends RecordId> {

    /**
     * Provides the identifier of the record.
     *
     * @return The identifier of the current record.
     */
    I id();
}
