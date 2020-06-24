package io.javaclasses.filehub.storage;

import io.javaclasses.filehub.api.Username;
import jdk.nashorn.internal.ir.annotations.Immutable;

import java.util.*;

/**
 * The class for storing user records.
 */
@Immutable
public class UserStorage implements Storage<UserId, UserRecord> {

    /**
     * The map that stores user records.
     */
    private final Map<UserId, UserRecord> storage = Collections.synchronizedMap(new HashMap<>());

    /**
     * Provides the user with the specified ID.
     *
     * @param recordId The identifier of the required record.
     * @return The required user.
     */
    @Override
    public UserRecord get(UserId recordId) {

        return storage.get(recordId);
    }

    /**
     * Saves the specified user record in the storage. If the storage previously contained the record, updates it.
     *
     * @param record The new user record.
     * @return The added record.
     */
    @Override
    public UserRecord put(UserRecord record) {

        storage.put(record.id(), record);
        return record;
    }

    /**
     * Removes the user record with the specified user ID from the storage.
     *
     * @param recordId The identifier of the record to remove.
     */
    @Override
    public void remove(UserId recordId) {

        storage.remove(recordId);
    }

    /**
     * Provides all stored records.
     *
     * @return A list of all the records.
     */
    @Override
    public List<UserRecord> getAll() {

        return new ArrayList<>(storage.values());
    }

    /**
     * Indicates whether the user storage contain a user with the corresponding username or not.
     *
     * @param username The username to check.
     * @return True in case there is a user with the provided name in the storage.
     */
    public boolean containsUsername(Username username) {

        return storage.values()
                .stream()
                .anyMatch(userRecord -> userRecord.username().equals(username));
    }
}
