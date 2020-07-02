package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.ZoneId;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("The GettingUser process should")
class GettingUserTest {

    private TokenStorage prepareTokenStorage(Token token, UserId userId) {

        TokenStorage tokenStorage = new TokenStorage();
        tokenStorage.put(new TokenRecord(new TokenId(""), token, userId,
                LocalDateTime.now(ZoneId.systemDefault()).plusDays(30)));
        return tokenStorage;
    }

    private UserStorage prepareUserStorage(UserId userId, FolderId folderId) {

        UserStorage userStorage = new UserStorage();
        userStorage.put(new UserRecord(userId, new Username("administrator"), "", folderId));
        return userStorage;
    }

    private GettingUser prepareProcess(Token token, UserRecord userRecord) {

        TokenStorage tokenStorage = prepareTokenStorage(token, userRecord.id());
        UserStorage userStorage = prepareUserStorage(userRecord.id(), userRecord.rootFolderId());

        return new GettingUser(tokenStorage, userStorage);
    }

    @Test
    @DisplayName("provide correct user record when the token is valid.")
    void testValidToken() {

        Token token = new Token(generate());
        UserRecord userRecord = new UserRecord(new UserId(generate()), new Username("administrator"),
                "", new FolderId(""));

        GettingUser process = prepareProcess(token, userRecord);

        assertWithMessage("The GettingUser process provided incorrect user record.")
                .that(process.handle(new GetUser(token)))
                .isEqualTo(userRecord);
    }

    @Test
    @DisplayName("throw an exception when the token is incorrect.")
    void testInvalidToken() {

        UserRecord userRecord = new UserRecord(new UserId(generate()), new Username("administrator"),
                "", new FolderId(""));
        GettingUser process = prepareProcess(new Token(generate()), userRecord);

        assertThrows(UnauthorizedException.class, () ->
                        process.handle(new GetUser(new Token("wrong-token"))),
                "The GettingUser process didn't throw an exception for a wrong token.");
    }

    @Test
    @DisplayName("throw an exception when the user from the token record does not exist.")
    void testNonexistentUser() {

        Token token = new Token(generate());
        FolderId folderId = new FolderId(generate());

        TokenStorage tokenStorage = prepareTokenStorage(token, new UserId("wrong-user"));
        UserStorage userStorage = prepareUserStorage(new UserId(generate()), folderId);

        GettingUser process = new GettingUser(tokenStorage, userStorage);

        assertThrows(UnauthorizedException.class, () ->
                        process.handle(new GetUser(new Token("wrong-token"))),
                "The GettingUser process didn't throw an exception for a nonexistent " +
                        "user ID, though it should have.");
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(GettingUser.class);
        tester.testAllPublicInstanceMethods(new GettingUser(new TokenStorage(), new UserStorage()));
    }
}
