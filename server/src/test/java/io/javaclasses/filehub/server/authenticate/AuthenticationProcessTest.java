package io.javaclasses.filehub.server.authenticate;

import io.javaclasses.filehub.server.Password;
import io.javaclasses.filehub.server.Token;
import io.javaclasses.filehub.server.Username;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("AuthenticationProcessTest should ")
class AuthenticationProcessTest {

    @DisplayName("log the user with correct credentials.")
    @Test
    void testCorrectLogIn() throws AuthenticationError {

        Username username = new Username("admin");
        Password password = new Password("1234");

        LogInCommand command = new LogInCommand(username, password);

        AuthenticationProcess process = new AuthenticationProcess();

        assertWithMessage("The authentication process should return a token when correct details " +
                "are used")
                .that(process.logIn(command))
                .isInstanceOf(Token.class);
    }

    @DisplayName("throw an authentication error in case the credentials are incorrect.")
    @Test
    void testIncorrectLogIn() {

        Username rightUsername = new Username("admin");
        Username wrongUsername = new Username("user");

        Password rightPassword = new Password("1234");
        Password wrongPassword = new Password("pass123");

        AuthenticationProcess process = new AuthenticationProcess();

        try {

            process.logIn(new LogInCommand(rightUsername, null));
        } catch (NullPointerException e) {

            assertWithMessage("The authentication process should throw a NullPointerException if " +
                    "the password is null.")
                    .that(true)
                    .isTrue();
        } catch (Exception e) {

            assertWithMessage("The authentication process should throw an authentication error if " +
                    "the password is null.")
                    .that(false)
                    .isTrue();
        }

        try {

            process.logIn(new LogInCommand(null, rightPassword));
        } catch (NullPointerException e) {

            assertWithMessage("The authentication process should throw a NullPointerException if " +
                    "the username is null.")
                    .that(true)
                    .isTrue();
        } catch (Exception e) {

            assertWithMessage("The authentication process should throw an authentication error if " +
                    "the username is null.")
                    .that(false)
                    .isTrue();
        }

        try {

            process.logIn(new LogInCommand(rightUsername, wrongPassword));
        } catch (AuthenticationError e) {

            assertWithMessage("The authentication process should throw an authentication error if " +
                    "the password is incorrect.")
                    .that(true)
                    .isTrue();
        } catch (Exception e) {

            assertWithMessage("The authentication process should throw an authentication error if " +
                    "the password is incorrect.")
                    .that(false)
                    .isTrue();
        }

        try {

            process.logIn(new LogInCommand(wrongUsername, rightPassword));
        } catch (AuthenticationError e) {

            assertWithMessage("The authentication process should throw an authentication error if " +
                    "the username is incorrect.")
                    .that(true)
                    .isTrue();
        } catch (Exception e) {

            assertWithMessage("The authentication process should throw an authentication error if " +
                    "the username is incorrect.")
                    .that(false)
                    .isTrue();
        }
    }
}
