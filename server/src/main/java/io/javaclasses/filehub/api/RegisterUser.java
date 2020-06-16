package io.javaclasses.filehub.api;

/**
 * The command that stores username and password provided during the registration process.
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

        validateCredentials(username, password);

        this.username = username;
        this.password = password;
    }

    private void validateCredentials(Username username, Password password) {

        if (username == null) {

            throw new ValidationError("The username is null.");
        }

        if (password == null) {

            throw new ValidationError("The password is null.");
        }

        if (username.value().length() < 8) {

            throw new ValidationError("The username is too short.");
        }

        if (password.value().length() < 8) {

            throw new ValidationError("The password is too short.");
        }
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
