package io.javaclasses.filehub.api;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A command that represents an intention of a client to log in the FileHub web application.
 */
public class AuthenticateUser implements Command {

    /**
     * The username from the client.
     */
    private final Username username;

    /**
     * The password from the client.
     */
    private final Password password;

    /**
     * Creates an instance of the AuthenticateUser command with set username and password.
     *
     * @param username The username provided by the client during the authentication process.
     * @param password The password provided by the client during the authentication process.
     */
    public AuthenticateUser(Username username, Password password) {

        this.username = checkNotNull(username);
        this.password = checkNotNull(password);
    }

    /**
     * Provides a string representation of the AuthenticateUser command.
     *
     * @return A string representation of the AuthenticateUser command.
     */
    @Override
    public String toString() {
        return "AuthenticateUser{" +
                "username=" + username +
                ", password=" + password +
                '}';
    }

    /**
     * Provides the command username.
     *
     * @return The stored username.
     */
    public Username username() {

        return username;
    }

    /**
     * Provides the command password.
     *
     * @return The stored password.
     */
    public Password password() {
        return password;
    }
}
