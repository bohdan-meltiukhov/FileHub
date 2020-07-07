package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.LoggedInUser;
import io.javaclasses.filehub.storage.LoggedInUserStorage;
import io.javaclasses.filehub.storage.Token;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import io.javaclasses.filehub.storage.UserStorage;
import org.slf4j.Logger;

import java.time.Duration;
import java.time.LocalDateTime;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.ApplicationTimezone.getTimeZone;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static io.javaclasses.filehub.api.PasswordHasher.hash;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * The process that authenticates a user in the FileHub web application.
 */
public class Authentication implements ApplicationProcess<AuthenticateUser, Token> {

    /**
     * A {@link Duration} after which a token is considered as expired.
     */
    private static final Duration tokenLifeTime = Duration.ofDays(30);

    /**
     * A storage with all registered users.
     */
    private final UserStorage userStorage;

    /**
     * A storage with all authentication tokens.
     */
    private final LoggedInUserStorage loggedInUserStorage;

    /**
     * Creates an instance of the Authentication process with set user and token storage.
     *
     * @param userStorage  The storage with all registered users.
     * @param loggedInUserStorage The storage with all authentication tokens.
     */
    public Authentication(UserStorage userStorage, LoggedInUserStorage loggedInUserStorage) {

        this.userStorage = checkNotNull(userStorage);
        this.loggedInUserStorage = checkNotNull(loggedInUserStorage);
    }

    /**
     * Authenticates a user in the FileHub application using the provided command. Creates an authentication token in
     * case the credentials are correct.
     *
     * @param command The command with provided username and password.
     * @return The created authentication token
     */
    @Override
    public Token handle(AuthenticateUser command) {

        Logger logger = getLogger(Authentication.class);
        if (logger.isDebugEnabled()) {
            logger.debug("Starting the authentication process.");
        }

        checkNotNull(command);

        UserRecord userRecord = userStorage.get(command.username(), hash(command.password()));

        if (userRecord == null) {

            if (logger.isDebugEnabled()) {
                logger.debug("The command {} contains incorrect credentials.", command);
            }

            throw new UnauthorizedException("The username or password you entered is incorrect.");
        }

        if (logger.isDebugEnabled()) {
            logger.debug("Found a user {}.", userRecord);
        }

        LoggedInUser loggedInUser = createLoggedInUser(userRecord.id());

        loggedInUserStorage.put(loggedInUser);

        if (logger.isDebugEnabled()) {
            logger.debug("Created and saved a token record: {}.", loggedInUser);
        }

        return loggedInUser.id();
    }

    /**
     * Creates the token expiration time.
     *
     * @return The time when a token expires.
     */
    private LocalDateTime createExpirationTime() {

        return LocalDateTime.now(getTimeZone()).plus(tokenLifeTime);
    }

    /**
     * Creates a record about a logged in user.
     *
     * @param userId An identifier of the user.
     * @return The created {@link LoggedInUser}.
     */
    private LoggedInUser createLoggedInUser(UserId userId) {

        LocalDateTime expirationDate = createExpirationTime();

        return new LoggedInUser(new Token(generate()), userId, expirationDate);
    }
}
