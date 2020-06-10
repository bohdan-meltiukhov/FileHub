package io.javaclasses.filehub.server;

/**
 * The command that stores username and password provided during the authentication process.
 */
public class LogInCommand {

    /**
     * The username that user provided during the authentication process.
     */
    private final Username username;

    /**
     * The password that user provided during the authentication process.
     */
    private final Password password;

    /**
     * Creates an instance of the log in command with set username and password.
     *
     * @param username The provided username.
     * @param password The provided password.
     */
    public LogInCommand(Username username, Password password) {

        this.username = username;
        this.password = password;
    }

    /**
     * Provides the log in command username.
     *
     * @return The stored username.
     */
    public Username getUsername() {

        return username;
    }

    /**
     * Provides the log in command password.
     *
     * @return The stored password.
     */
    public Password getPassword() {

        return password;
    }
}
