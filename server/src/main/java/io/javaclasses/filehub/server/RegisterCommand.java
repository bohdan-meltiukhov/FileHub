package io.javaclasses.filehub.server;

/**
 * The command that stores username and password provided during the registration process.
 */
public class RegisterCommand {

    /**
     * The username that the user provided during the registration process.
     */
    private final Username username;

    /**
     * The password that the user chose during the registration process.
     */
    private final Password password;

    /**
     * Creates an instance of the register command with set username and password.
     *
     * @param username The desired username.
     * @param password The desired account password.
     */
    public RegisterCommand(Username username, Password password) {

        this.username = username;
        this.password = password;
    }

    /**
     * Provides the register command username.
     *
     * @return The stored username.
     */
    public Username getUsername() {
        return username;
    }

    /**
     * Provides the register command password.
     *
     * @return The stored password.
     */
    public Password getPassword() {
        return password;
    }
}
