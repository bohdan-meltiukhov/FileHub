package io.javaclasses.filehub.storage;

import java.util.List;

/**
 * A general interface for different storage classes in the FileHub server.
 *
 * @param <I> The type of the record identifier.
 * @param <R> The type of the record.
 */
public interface Storage<I extends RecordId, R extends Record<I>> {

    /**
     * Provides the record with the provided identifier.
     *
     * @param recordId The identifier of the required record.
     * @return The needed record.
     */
    R read(I recordId);

    /**
     * Saves the specified record in the storage. If the storage previously contained the record, updates it.
     *
     * @param record The new record.
     * @return The added record.
     */
    R put(R record);

    /**
     * Removes the record with the specified ID from the storage.
     *
     * @param recordId The identifier of the record to remove.
     */
    void delete(I recordId);

    /**
     * Provides all the stored records.
     *
     * @return A list of all the records from the storage.
     */
    List<R> readAll();
}
