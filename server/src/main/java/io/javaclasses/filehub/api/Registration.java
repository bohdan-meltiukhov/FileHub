package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import io.javaclasses.filehub.storage.UserStorage;
import jdk.nashorn.internal.ir.annotations.Immutable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.BlockingDeque;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.slf4j.LoggerFactory.getLogger;

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

        Logger logger = getLogger(Registration.class);

        if (logger.isDebugEnabled()) {
            logger.debug("Starting the registration process.");
        }

        checkNotNull(command);
        if (logger.isDebugEnabled()) {
            logger.debug("The RegisterUser command is not null.");
        }

        if (storage.containsUsername(command.username())) {

            throw new UsernameAlreadyTakenException("The username is already taken.");
        }
        if (logger.isDebugEnabled()) {
            logger.debug("The username is available.");
        }

        UserRecord userRecord = new UserRecord(new UserId(), command.username(), new PasswordHash(command.password()));

        storage.put(userRecord);
        if (logger.isDebugEnabled()) {
            logger.debug("New user is added successfully: {}.", userRecord);
        }
        return null;
    }
}
