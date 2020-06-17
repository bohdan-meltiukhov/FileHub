package io.javaclasses.filehub.api;

/**
 * The process for registering users.
 */
public class Registration implements Process {

    /**
     * Registers a user using the provided command.
     *
     * @param command The command to use for the registration.
     * @throws ValidationError In case the username or password violates the validation rules.
     */
    public void handle(RegisterUser command) throws ValidationError {

        if (command.username().value().equals("administrator")) {

            throw new ValidationError("username", "The username is already taken.");
        }
    }
}
