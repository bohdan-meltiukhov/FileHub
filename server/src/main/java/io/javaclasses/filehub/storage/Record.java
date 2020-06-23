package io.javaclasses.filehub.storage;

/**
 * An object that should be saved in a particular storage.
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
