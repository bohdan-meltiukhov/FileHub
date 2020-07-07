package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import io.javaclasses.filehub.storage.UserStorage;
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
     * An slf4j logger.
     */
    private static final Logger logger = getLogger(Registration.class);

    /**
     * The storage for user records.
     */
    private final UserStorage userStorage;

    /**
     * A storage with all folders.
     */
    private final FolderMetadataStorage folderMetadataStorage;

    /**
     * Creates an instance of the registration process with set storage.
     *
     * @param userStorage           The storage for user records.
     * @param folderMetadataStorage The storage with all folders.
     */
    public Registration(UserStorage userStorage, FolderMetadataStorage folderMetadataStorage) {

        this.userStorage = checkNotNull(userStorage);
        this.folderMetadataStorage = checkNotNull(folderMetadataStorage);
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

        if (logger.isDebugEnabled()) {
            logger.debug("Starting the registration process.");
        }

        checkNotNull(command);

        if (userStorage.contains(command.username())) {

            throw new UsernameAlreadyTakenException(
                    String.format("The username '%s' is already taken.", command.username().value()));
        }
        if (logger.isDebugEnabled()) {
            logger.debug("The username {} is available.", command.username());
        }

        UserId userId = new UserId(generate());

        FolderMetadataRecord folder = createNewFolder(userId);
        folderMetadataStorage.put(folder);

        UserRecord userRecord = createNewUserRecord(userId, command, folder.id());
        userStorage.put(userRecord);

        if (logger.isDebugEnabled()) {
            logger.debug("New user is added successfully: {}.", userRecord);
        }
        return null;
    }

    /**
     * Creates a new {@link FolderMetadataRecord}.
     *
     * @param userId An identifier of teh current user.
     * @return The created folder.
     */
    private FolderMetadataRecord createNewFolder(UserId userId) {

        return new FolderMetadataRecord(new FolderId(generate()), userId, new FolderName("New Folder"));
    }

    /**
     * Creates a new {@link UserRecord}.
     *
     * @param userId   an identifier of the current user.
     * @param command  The command for the registration process.
     * @param folderId The identifier of the user's root folder.
     * @return The created {@link UserRecord}.
     */
    private UserRecord createNewUserRecord(UserId userId, RegisterUser command, FolderId folderId) {

        String hashedPassword = hash(command.password());

        return new UserRecord(userId, command.username(), hashedPassword, folderId);
    }
}
