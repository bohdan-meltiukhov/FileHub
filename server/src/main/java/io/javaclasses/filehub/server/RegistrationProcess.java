package io.javaclasses.filehub.server;

public class RegistrationProcess {

    private final RegistrationCommand command = new RegistrationCommand();

    private final UserCredentials userCredentials;

    public RegistrationProcess(UserCredentials userCredentials) {
        this.userCredentials = userCredentials;
    }

    public void run() throws ValidationError {
        command.register(userCredentials);
    }
}
