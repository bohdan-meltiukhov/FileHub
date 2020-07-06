package io.javaclasses.filehub.storage;

import io.javaclasses.filehub.api.Token;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.ZoneId;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;

@DisplayName("The TokenStorage should")
class TokenStorageTest {

    private LocalDateTime prepareExpirationDate() {

        return LocalDateTime.now(ZoneId.systemDefault()).plusDays(30);
    }

    @Test
    @DisplayName("provide the token record by the token value object.")
    void testGetByToken() {

        Token token = new Token(generate());

        TokenStorage tokenStorage = new TokenStorage();
        TokenRecord tokenRecord = new TokenRecord(new TokenId(generate()), token, new UserId(generate()),
                prepareExpirationDate());
        tokenStorage.put(tokenRecord);

        assertWithMessage("The TokenStorage provided incorrect token record " +
                "by token " + token.toString())
                .that(tokenStorage.get(token))
                .isEqualTo(tokenRecord);
    }
}
