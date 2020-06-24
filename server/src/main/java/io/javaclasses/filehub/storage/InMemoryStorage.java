package io.javaclasses.filehub.storage;

import jdk.nashorn.internal.ir.annotations.Immutable;

import java.util.*;

/**
 * An in-memory storage for records in the FileHub server application.
 *
 * <p>This storage implementation uses an in-memory {@link HashMap} to store values.
 *
 * @param <I> The type of the records' identifiers.
 * @param <R> The type of the records.
 */
@Immutable
public class InMemoryStorage<I extends RecordId, R extends StorageRecord<I>> implements Storage<I, R> {

    /**
     * A map with all stored records.
     */
    private final Map<I, R> storage = Collections.synchronizedMap(new HashMap<>());

    /**
     * Provides a record with the specifier identifier.
     *
     * @param recordId The identifier of the required record.
     * @return The required record.
     */
    @Override
    public R get(I recordId) {

        return storage.get(recordId);
    }

    /**
     * Saves the provided record in the storage. If the storage previously contained the record, updates it.
     *
     * @param record The new record.
     */
    @Override
    public void put(R record) {

        storage.put(record.id(), record);
    }

    /**
     * Removes the record with the specified identifier from the storage.
     *
     * @param recordId The identifier of the record to remove.
     */
    @Override
    public void remove(I recordId) {

        storage.remove(recordId);
    }

    /**
     * Provides all the stored records.
     *
     * @return A list of all the stored records.
     */
    @Override
    public List<R> getAll() {

        return new ArrayList<>(storage.values());
    }
}
