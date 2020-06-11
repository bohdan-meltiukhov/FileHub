package io.javaclasses.filehub.server.authenticate;

import io.javaclasses.filehub.server.Token;

/**
 * The process for authenticating users.
 */
public class AuthenticationProcess {

    /**
     * Logs in the user with the provided command.
     *
     * @param command The command to use for the authentication.
     * @return An authentication token for the user.
     * @throws AuthenticationError In case the provided details do not match.
     */
    public Token logIn(LogInCommand command) throws AuthenticationError {

        if (command.getUsername().getValue().equals("admin") && command.getPassword().getValue().equals("1234")) {

            return new Token();
        } else {

            throw new AuthenticationError("The details do not match.");
        }
    }
}
