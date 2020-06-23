package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import io.javaclasses.filehub.storage.UserStorage;
import jdk.internal.jline.internal.Preconditions;

/**
 * The process for registering users.
 */
public class Registration implements Process<RegisterUser, Void> {

    /**
     * The storage for user records.
     */
    private final UserStorage storage;

    /**
     * Creates an instance of the registration process with set storage.
     *
     * @param storage The storage for user records.
     */
    public Registration(UserStorage storage) {

        Preconditions.checkNotNull(storage);

        this.storage = storage;
    }

    /**
     * Registers a user using the provided command.
     *
     * @param command The command to use for the registration.
     * @return Void.
     * @throws ValidationError In case the username or password violates the validation rules.
     */
    public Void handle(RegisterUser command) throws ValidationError {

        Preconditions.checkNotNull(command);

        if (storage.readAll()
                .stream()
                .anyMatch(userRecord -> userRecord.username().equals(command.username()))
        ) {

            throw new ValidationError("username", "The username is already taken.");
        }

        storage.put(new UserRecord(new UserId(), command.username(), new PasswordHash(command.password())));
        return null;
    }
}
