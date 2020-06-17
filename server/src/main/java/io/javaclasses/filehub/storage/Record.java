package io.javaclasses.filehub.storage;

/**
 * The interface for different storage records.
 *
 * @param <I> The type of the record identifier.
 */
public interface Record<I extends RecordId> {

    /**
     * Provides the identifier of the record.
     *
     * @return The identifier of the current record.
     */
    I id();
}
