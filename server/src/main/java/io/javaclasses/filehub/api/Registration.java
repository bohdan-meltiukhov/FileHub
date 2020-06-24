package io.javaclasses.filehub.api;

import com.google.common.base.Preconditions;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import io.javaclasses.filehub.storage.UserStorage;
import jdk.nashorn.internal.ir.annotations.Immutable;

/**
 * The process that handles a {@link RegisterUser} command.
 */
@Immutable
public class Registration implements ApplicationProcess<RegisterUser, Void> {

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
     * @throws UsernameValidationException In case the username or password violates the validation rules.
     */
    @Override
    public Void handle(RegisterUser command) throws UsernameValidationException {

        Preconditions.checkNotNull(command);

        if (storage.containsUsername(command.username())) {

            throw new UsernameValidationException("The username is already taken.");
        }

        storage.put(new UserRecord(new UserId(), command.username(), new PasswordHash(command.password())));
        return null;
    }
}
