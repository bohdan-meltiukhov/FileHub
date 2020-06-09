package io.javaclasses.filehub.server;

public class LogInCommand {

    /**
     * Logs the current user in and provides a token or throws an AuthenticationError exception if the details do not
     * match.
     *
     * @param userCredentials - The provided user account credentials.
     * @return The token for the current user session.
     * @throws AuthenticationError In case the provided details do not match.
     */
    Token logIn(UserCredentials userCredentials) throws AuthenticationError {

        if (userCredentials.getUsername().getValue().equals("admin") &&
                userCredentials.getPassword().getValue().equals("1234")) {

            return new Token();
        } else {

            throw new AuthenticationError("The details do not match.");
        }
    }
}
