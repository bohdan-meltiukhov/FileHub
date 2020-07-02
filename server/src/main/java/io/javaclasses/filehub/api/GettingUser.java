package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.TokenStorage;
import io.javaclasses.filehub.storage.UserRecord;
import io.javaclasses.filehub.storage.UserStorage;

import static com.google.common.base.Preconditions.checkNotNull;
import static io.javaclasses.filehub.api.FindUserService.findUser;

/**
 * An {@link ApplicationProcess} that provides the current user.
 */
public class GettingUser implements ApplicationProcess<GetUser, UserRecord> {

    /**
     * The storage with all tokens.
     */
    private final TokenStorage tokenStorage;

    /**
     * The storage with all registered users.
     */
    private final UserStorage userStorage;

    /**
     * Creates an instance of the GettingUser process.
     *
     * @param tokenStorage A storage with all authentication tokens.
     * @param userStorage  A storage with all registered users.
     */
    public GettingUser(TokenStorage tokenStorage, UserStorage userStorage) {

        this.tokenStorage = checkNotNull(tokenStorage);
        this.userStorage = checkNotNull(userStorage);
    }

    /**
     * Checks the data from the {@link GetUser} command and provides the current user.
     *
     * @param command The command with the authentication token.
     * @return The current user.
     */
    @Override
    public UserRecord handle(GetUser command) {

        checkNotNull(command);

        return findUser(tokenStorage, userStorage, command.token());
    }
}
