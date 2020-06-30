package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.*;
import org.slf4j.Logger;

import java.time.LocalDateTime;
import java.time.ZoneId;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static io.javaclasses.filehub.api.PasswordHasher.hash;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * The process that authenticates a user in the FileHu web application.
 */
public class Authentication implements ApplicationProcess<AuthenticateUser, Token> {

    /**
     * A storage with all registered users.
     */
    private final UserStorage userStorage;

    /**
     * A storage with all authentication tokens.
     */
    private final TokenStorage tokenStorage;

    /**
     * Creates an instance of the Authentication process with set user and token storage.
     *
     * @param userStorage  The storage with all registered users.
     * @param tokenStorage The storage with all authentication tokens.
     */
    public Authentication(UserStorage userStorage, TokenStorage tokenStorage) {

        this.userStorage = checkNotNull(userStorage);
        this.tokenStorage = checkNotNull(tokenStorage);
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

        if (!userStorage.contains(command.username(), hash(command.password()))) {

            if (logger.isDebugEnabled()) {
                logger.debug("The command {} contains invalid credentials.", command);
            }

            throw new CredentialsAreNotValidException("The username or password are incorrect.");
        }

        UserRecord userRecord = userStorage.get(command.username());

        if (logger.isDebugEnabled()) {
            logger.debug("Found a user {}.", userRecord);
        }

        LocalDateTime expirationDate = LocalDateTime.now(ZoneId.systemDefault()).plusDays(30);

        TokenRecord tokenRecord = new TokenRecord(new TokenId(generate()), new Token(generate()), userRecord.id(),
                expirationDate);

        tokenStorage.put(tokenRecord);

        if (logger.isDebugEnabled()) {
            logger.debug("Created a saved token record: {}.", tokenRecord);
        }

        return tokenRecord.token();
    }
}
