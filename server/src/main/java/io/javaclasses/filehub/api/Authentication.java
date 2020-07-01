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
 * The process that authenticates a user in the FileHub web application.
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

        LocalDateTime expirationDate = LocalDateTime.now(ZoneId.systemDefault()).plusDays(30);

        TokenRecord tokenRecord = new TokenRecord(new TokenId(generate()), new Token(generate()), userRecord.id(),
                expirationDate);

        tokenStorage.put(tokenRecord);

        if (logger.isDebugEnabled()) {
            logger.debug("Created and saved a token record: {}.", tokenRecord);
        }

        return tokenRecord.token();
    }
}
