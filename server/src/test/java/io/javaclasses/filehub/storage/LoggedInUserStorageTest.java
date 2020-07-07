package io.javaclasses.filehub.storage;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.ZoneId;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.ApplicationTimezone.getTimeZone;
import static io.javaclasses.filehub.api.IdGenerator.generate;

@DisplayName("The TokenStorage should")
class LoggedInUserStorageTest {

    private LocalDateTime prepareExpirationDate() {

        return LocalDateTime.now(getTimeZone()).plusDays(30);
    }

    @Test
    @DisplayName("provide the token record by the token value object.")
    void testGetByToken() {

        Token token = new Token(generate());

        LoggedInUserStorage loggedInUserStorage = new LoggedInUserStorage();
        LoggedInUser loggedInUser = new LoggedInUser(token, new UserId(generate()),
                prepareExpirationDate());
        loggedInUserStorage.put(loggedInUser);

        assertWithMessage("The TokenStorage provided incorrect token record " +
                "by token " + token.toString())
                .that(loggedInUserStorage.get(token))
                .isEqualTo(loggedInUser);
    }
}
