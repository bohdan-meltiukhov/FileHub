package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.*;
import org.slf4j.Logger;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static io.javaclasses.filehub.api.PasswordHasher.hash;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * The process that handles a {@link RegisterUser} command.
 */
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
     * @throws UsernameIsNotValidException In case the username or password violates the validation rules.
     */
    @Override
    public Void handle(RegisterUser command) throws UsernameIsNotValidException {

        Logger logger = getLogger(Registration.class);

        if (logger.isDebugEnabled()) {
            logger.debug("Starting the registration process.");
        }

        checkNotNull(command);

        if (storage.contains(command.username())) {

            throw new UsernameAlreadyTakenException(
                    String.format("The username '%s' is already taken.", command.username().value()));
        }
        if (logger.isDebugEnabled()) {
            logger.debug("The username {} is available.", command.username());
        }

        UserId userId = new UserId(generate());
        String hashedPassword = hash(command.password());

        FolderMetadataRecord folder = new FolderMetadataRecord(new FolderId(generate()), null,
                userId, "New Folder", 0);

        UserRecord userRecord = new UserRecord(userId, command.username(), hashedPassword, folder.id());

        storage.put(userRecord);
        if (logger.isDebugEnabled()) {
            logger.debug("New user is added successfully: {}.", userRecord);
        }
        return null;
    }
}
