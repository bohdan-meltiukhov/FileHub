package io.javaclasses.filehub.api;

import com.google.common.base.Preconditions;

/**
 * A command from a client application that holds username and password for the {@link Registration} process.
 */
public class RegisterUser implements Command {

    /**
     * The username that the user provided during the registration process.
     */
    private final Username username;

    /**
     * The password that the user chose during the registration process.
     */
    private final Password password;

    /**
     * Creates an instance of the register user command with set username and password.
     *
     * @param username The desired username.
     * @param password The desired account password.
     */
    public RegisterUser(Username username, Password password) {

        Preconditions.checkNotNull(username);
        Preconditions.checkNotNull(password);

        this.username = username;
        this.password = password;
    }

    /**
     * Provides the register command username.
     *
     * @return The stored username.
     */
    Username username() {

        return username;
    }

    /**
     * Provides the register command password.
     *
     * @return The stored password.
     */
    Password password() {

        return password;
    }
}
