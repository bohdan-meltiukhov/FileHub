package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import io.javaclasses.filehub.storage.UserStorage;
import jdk.nashorn.internal.ir.annotations.Immutable;

import static com.google.common.base.Preconditions.checkNotNull;

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

        this.storage = checkNotNull(storage);
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

        checkNotNull(command);

        if (storage.containsUsername(command.username())) {

            throw new UsernameValidationException("The username is already taken.");
        }

        storage.put(new UserRecord(new UserId(), command.username(), new PasswordHash(command.password())));
        return null;
    }
}
