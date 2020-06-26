package io.javaclasses.filehub.api;

import jdk.nashorn.internal.ir.annotations.Immutable;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A command from a client application that holds username and password for the {@link Registration} process.
 */
@Immutable
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

        this.username = checkNotNull(username);
        this.password = checkNotNull(password);
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
