package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * An in-memory storage for records in the FileHub web application.
 *
 * <p>This storage implementation uses a {@link HashMap} to store values.
 *
 * @param <I> The type of a {@link Record} identifier.
 * @param <R> The type of a {@link Record}.
 */
public abstract class InMemoryStorage<I extends RecordId, R extends StorageRecord<I>> implements Storage<I, R> {

    /**
     * The object for logging messages.
     */
    private static final Logger logger = LoggerFactory.getLogger(InMemoryStorage.class);

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

        checkNotNull(recordId);

        if (logger.isDebugEnabled()) {
            logger.debug("Getting a record with ID {}.", recordId);
        }
        return storage.get(recordId);
    }

    /**
     * Saves the provided record in the storage. If the storage previously contained the record, updates it.
     *
     * @param record The new record.
     */
    @Override
    public void put(R record) {

        checkNotNull(record);

        if (logger.isDebugEnabled()) {
            logger.debug("Putting a record to the storage: {}.", record);
        }
        storage.put(record.id(), record);
    }

    /**
     * Removes the record with the specified identifier from the storage.
     *
     * @param recordId The identifier of the record to remove.
     */
    @Override
    public void remove(I recordId) {

        checkNotNull(recordId);

        if (logger.isDebugEnabled()) {
            logger.debug("Removing the record with ID {}.", recordId);
        }
        storage.remove(recordId);
    }

    /**
     * Provides all the stored records.
     *
     * @return A list of all the stored records.
     */
    @Override
    public List<R> getAll() {

        if (logger.isDebugEnabled()) {
            logger.debug("Providing all stored records.");
        }
        return new ArrayList<>(storage.values());
    }
}
