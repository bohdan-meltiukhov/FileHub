package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.TokenStorage;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import io.javaclasses.filehub.storage.UserStorage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static io.javaclasses.filehub.api.PasswordHasher.hash;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("The Authentication process should")
class AuthenticationTest {

    private UserStorage prepareUserStorage(Username username, Password password) {

        UserStorage userStorage = new UserStorage();
        userStorage.put(new UserRecord(new UserId(generate()), username, hash(password), new FolderId("")));
        return userStorage;
    }

    @Test
    @DisplayName("create a token correctly.")
    void testCreateToken() {

        Username username = new Username("administrator");
        Password password = new Password("secure-password");

        UserStorage userStorage = prepareUserStorage(username, password);
        TokenStorage tokenStorage = new TokenStorage();

        Authentication process = new Authentication(userStorage, tokenStorage);
        Token token = process.handle(new AuthenticateUser(username, password));

        assertWithMessage("The Authentication process did not create a token.")
                .that(token)
                .isNotNull();

        assertWithMessage("The Authentication process didn't add the created token to the token " +
                "storage")
                .that(tokenStorage.getAll().get(0).token())
                .isEqualTo(token);
    }

    @Test
    @DisplayName("throw an exception if the provided credentials are invalid.")
    void testInvalidCredentials() {

        Username username = new Username("administrator");
        Password password = new Password("secure-password");

        UserStorage userStorage = prepareUserStorage(username, password);
        TokenStorage tokenStorage = new TokenStorage();

        Authentication process = new Authentication(userStorage, tokenStorage);

        AuthenticateUser command = new AuthenticateUser(new Username("hackerman"),
                new Password("wrong-password"));

        assertThrows(UnauthorizedException.class, () -> process.handle(command),
                "The Authentication process didn't throw a CredentialsAreNotValidException with invalid " +
                        "credentials, though it should have.");
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(Authentication.class);
        tester.testAllPublicInstanceMethods(new Authentication(new UserStorage(), new TokenStorage()));
    }
}
