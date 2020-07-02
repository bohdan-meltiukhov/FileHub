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

@DisplayName("The RootFolderIdGetting process should")
class RootFolderIdGettingTest {

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

    private RootFolderIdGetting prepareProcess(Token token, FolderId folderId) {

        UserId userId = new UserId(generate());

        TokenStorage tokenStorage = prepareTokenStorage(token, userId);
        UserStorage userStorage = prepareUserStorage(userId, folderId);

        return new RootFolderIdGetting(tokenStorage, userStorage);
    }

    @Test
    @DisplayName("provide correct folder ID when the token is valid.")
    void testValidToken() {

        Token token = new Token(generate());
        FolderId folderId = new FolderId(generate());

        RootFolderIdGetting process = prepareProcess(token, folderId);

        assertWithMessage("The RootFolderIdGetting process provided incorrect folder ID.")
                .that(process.handle(new GetRootFolderId(token)))
                .isEqualTo(folderId);
    }

    @Test
    @DisplayName("throw an UnauthorizedException when the token is incorrect.")
    void testInvalidToken() {

        FolderId folderId = new FolderId(generate());
        RootFolderIdGetting process = prepareProcess(new Token(generate()), folderId);

        assertThrows(UnauthorizedException.class, () ->
                        process.handle(new GetRootFolderId(new Token("wrong-token"))),
                "The RootFolderIdGetting process didn't throw an UnauthorizedException for a wrong token.");
    }

    @Test
    @DisplayName("throw an UnauthorizedException when the user from the token record does not exist.")
    void testNonexistentUser() {

        Token token = new Token(generate());
        FolderId folderId = new FolderId(generate());

        TokenStorage tokenStorage = prepareTokenStorage(token, new UserId("wrong-user"));
        UserStorage userStorage = prepareUserStorage(new UserId(generate()), folderId);

        RootFolderIdGetting process = new RootFolderIdGetting(tokenStorage, userStorage);

        assertThrows(UnauthorizedException.class, () ->
                        process.handle(new GetRootFolderId(new Token("wrong-token"))),
                "The RootFolderIdGetting process didn't throw an UnauthorizedException for a nonexistent " +
                        "user ID, though it should have.");
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(RootFolderIdGetting.class);
        tester.testAllPublicInstanceMethods(new RootFolderIdGetting(new TokenStorage(), new UserStorage()));
    }
}
