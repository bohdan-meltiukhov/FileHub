package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.*;
import org.slf4j.Logger;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * An {@link View} that provides the identifier of the root folder for the current user.
 */
public class RootFolderIdView implements View<GetRootFolderId, FolderId> {

    /**
     * An SLF4J logger.
     */
    private static Logger logger = getLogger(RootFolderIdView.class);

    /**
     * A storage with all active authentication tokens.
     */
    private final TokenStorage tokenStorage;

    /**
     * A storage with all users.
     */
    private final UserStorage userStorage;

    /**
     * Creates an instance of the RootFolderId process with set storage.
     *
     * @param tokenStorage A storage with all tokens.
     * @param userStorage  A storage with all users.
     */
    public RootFolderIdView(TokenStorage tokenStorage, UserStorage userStorage) {

        this.tokenStorage = checkNotNull(tokenStorage);
        this.userStorage = checkNotNull(userStorage);
    }

    /**
     * Finds the identifier of the root folder of a user.
     *
     * @param command The command with required data.
     * @return The required identifier.
     */
    @Override
    public FolderId process(GetRootFolderId command) {

        checkNotNull(command);

        if (logger.isDebugEnabled()) {
            logger.debug("Starting the RootFolderIdGetting process.");
        }

        TokenRecord tokenRecord = tokenStorage.get(command.getToken());

        if (tokenRecord == null) {

            throw new UnauthorizedException("Authentication required. Please log in.");
        }

        if (logger.isDebugEnabled()) {
            logger.debug("Found the token record {}.", tokenRecord);
        }

        UserRecord userRecord = userStorage.get(tokenRecord.userId());

        if (userRecord == null) {

            throw new UnauthorizedException("Authentication required. Please log in.");
        }

        if (logger.isDebugEnabled()) {
            logger.debug("Found the user record {}.", userRecord);
        }

        return userRecord.rootFolderId();
    }
}
