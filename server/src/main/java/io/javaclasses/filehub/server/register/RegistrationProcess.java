package io.javaclasses.filehub.server.register;

/**
 * The process for registering users.
 */
public class RegistrationProcess {

    /**
     * Registers a user using the provided command.
     *
     * @param command The command to use for the registration.
     * @throws ValidationError In case the username or password violates the validation rules.
     */
    public void register(RegisterCommand command) throws ValidationError {

        if (command.getUsername().getValue().equals("admin")) {

            throw new ValidationError("The username is already taken.");
        }
    }
}
