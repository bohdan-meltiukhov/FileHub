package io.javaclasses.filehub.server;

public class LogInProcess {

    private final LogInCommand command = new LogInCommand();

    private final UserCredentials userCredentials;

    public LogInProcess(UserCredentials userCredentials) {

        this.userCredentials = userCredentials;
    }

    public Token run() throws AuthenticationError {

        return command.logIn(userCredentials);
    }
}
