package io.javaclasses.filehub.server;

/**
 * The value object for user credentials.
 *
 * <p>User credentials include a username and a password.
 */
public final class UserCredentials {

    /**
     * The name of a user.
     */
    private final Username username;

    /**
     * The password for this user account.
     */
    private final Password password;

    /**
     * Creates an instance of the UserCredential class with set username and password.
     *
     * @param username - The name of the current user.
     * @param password - The password for the user's account.
     */
    public UserCredentials(Username username, Password password) {
        this.username = username;
        this.password = password;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString() {
        return "UserCredentials{" +
                "username=" + username +
                ", password=" + password +
                '}';
    }

    /**
     * Provides the name of the current user.
     *
     * @return The name of the current user.
     */
    public Username getUsername() {
        return username;
    }

    /**
     * The getter for the password.
     *
     * @return The password for the current account.
     */
    public Password getPassword() {
        return password;
    }
}
