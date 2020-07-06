package io.javaclasses.filehub.web;

import io.javaclasses.filehub.api.CurrentUser;
import io.javaclasses.filehub.api.Token;
import io.javaclasses.filehub.api.UnauthorizedException;
import io.javaclasses.filehub.storage.TokenRecord;
import io.javaclasses.filehub.storage.TokenStorage;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import io.javaclasses.filehub.storage.UserStorage;
import org.slf4j.Logger;
import spark.Filter;
import spark.Request;
import spark.Response;

import java.time.LocalDateTime;
import java.time.ZoneId;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.apache.http.HttpStatus.SC_UNAUTHORIZED;
import static org.slf4j.LoggerFactory.getLogger;
import static spark.Spark.halt;

/**
 * A filter that checks if the request is authenticated and provides the current user.
 */
public class UserAuthenticationFilter implements Filter {

    /**
     * An slf4j logger.
     */
    private static final Logger logger = getLogger(UserAuthenticationFilter.class);

    /**
     * A storage with all tokens.
     */
    private final TokenStorage tokenStorage;

    /**
     * A storage with all registered users.
     */
    private final UserStorage userStorage;

    /**
     * Creates an instance of the UserAuthenticationFilter with set token and user storage.
     *
     * @param tokenStorage The storage with all authentication tokens.
     * @param userStorage  The storage with all users.
     */
    public UserAuthenticationFilter(TokenStorage tokenStorage, UserStorage userStorage) {

        this.tokenStorage = checkNotNull(tokenStorage);
        this.userStorage = checkNotNull(userStorage);
    }

    /**
     * Checks if the request contains a valid authentication token.
     *
     * @param request  The request from the client.
     * @param response The object for modifying the response.
     * @throws UnauthorizedException In case the token is not present or invalid.
     */
    @Override
    public void handle(Request request, Response response) {

        try {

            Token token = readToken(request);
            if (logger.isDebugEnabled()) {
                logger.debug("The request contains a token: {}.", token);
            }

            TokenRecord tokenRecord = tokenStorage.get(token);
            if (tokenRecord == null) {

                throw new NullPointerException();
            }

            checkExpirationDate(tokenRecord);

            if (logger.isDebugEnabled()) {
                logger.debug("The token didn't expire: {}.", tokenRecord);
            }

            UserRecord userRecord = userStorage.get(tokenRecord.userId());
            if (logger.isDebugEnabled()) {
                logger.debug("Found a token owner: {}.", userRecord);
            }

            saveUserRecord(userRecord);

        } catch (NullPointerException exception) {

            halt(SC_UNAUTHORIZED, "Authentication required. Please log in.");
        }
    }

    /**
     * Reads the authentication token from the request.
     *
     * @param request The request from the client.
     * @return The provided token.
     */
    private Token readToken(Request request) {

        return new Token(request.headers("Authentication"));
    }

    /**
     * Halts the request in case the token is expired.
     *
     * @param tokenRecord The {@link TokenRecord} to check.
     */
    private void checkExpirationDate(TokenRecord tokenRecord) {

        if (tokenRecord.expirationDate().isBefore(LocalDateTime.now(ZoneId.systemDefault()))) {

            if (logger.isDebugEnabled()) {
                logger.debug("The token expired: {}.", tokenRecord);
            }

            tokenStorage.remove(tokenRecord.id());
            halt(SC_UNAUTHORIZED, "Your session expired. Please log in.");
        }
    }

    /**
     * Saves the provided {@link UserRecord} as the current user.
     *
     * @param userRecord The {@link UserRecord} to save.
     */
    private void saveUserRecord(UserRecord userRecord) {

        CurrentUser.set(userRecord);
    }
}
