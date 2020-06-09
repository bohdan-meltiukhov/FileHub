package io.javaclasses.filehub.server;

public class RegistrationCommand {

    public void register(UserCredentials userCredentials) throws ValidationError {

        if (userCredentials.getUsername().getValue().equals("admin")) {

            throw new ValidationError("The username is already taken.");
        }
    }
}
