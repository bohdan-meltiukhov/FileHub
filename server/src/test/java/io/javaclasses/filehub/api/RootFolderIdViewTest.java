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

@DisplayName("The RootFolderIdView process should")
class RootFolderIdViewTest {

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

    private RootFolderIdView prepareProcess(Token token, FolderId folderId) {

        UserId userId = new UserId(generate());

        TokenStorage tokenStorage = prepareTokenStorage(token, userId);
        UserStorage userStorage = prepareUserStorage(userId, folderId);

        return new RootFolderIdView(tokenStorage, userStorage);
    }

    @Test
    @DisplayName("provide correct folder ID when the token is valid.")
    void testValidToken() {

        Token token = new Token(generate());
        FolderId folderId = new FolderId(generate());

        RootFolderIdView view = prepareProcess(token, folderId);

        assertWithMessage("The RootFolderIdGetting view provided incorrect folder ID.")
                .that(view.process(new GetRootFolderId(token)))
                .isEqualTo(folderId);
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(RootFolderIdView.class);
        tester.testAllPublicInstanceMethods(new RootFolderIdView(new TokenStorage(), new UserStorage()));
    }
}
