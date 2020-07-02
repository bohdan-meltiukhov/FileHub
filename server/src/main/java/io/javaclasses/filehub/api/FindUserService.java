package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.TokenRecord;
import io.javaclasses.filehub.storage.TokenStorage;
import io.javaclasses.filehub.storage.UserRecord;
import io.javaclasses.filehub.storage.UserStorage;
import org.slf4j.Logger;

import static org.slf4j.LoggerFactory.getLogger;

/**
 * A service that find a {@link UserRecord} by a {@link Token}.
 */
public class FindUserService {

    public static synchronized UserRecord findUser(TokenStorage tokenStorage, UserStorage userStorage, Token token)
            throws UnauthorizedException {

        Logger logger = getLogger(FindUserService.class);

        TokenRecord tokenRecord = tokenStorage.get(token);

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

        return userRecord;
    }
}
