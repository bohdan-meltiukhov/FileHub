package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.javaclasses.filehub.api.Token;
import io.javaclasses.filehub.api.Username;
import io.javaclasses.filehub.storage.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import spark.Request;
import spark.Response;

import java.time.LocalDateTime;
import java.time.ZoneId;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;

@DisplayName("The GetUserRoute should")
class GetUserRouteTest {

    private Request mockRequest(Token token) {

        return new Request() {

            @Override
            public String headers(String header) {
                return token.value();
            }

            @Override
            public String matchedPath() {
                return "/api/user";
            }
        };
    }

    private Response mockResponse() {

        return new Response() {

            @Override
            public void status(int code) {
            }
        };
    }

    private GetUserRoute prepareRoute(Username username, Token token) {

        UserId userId = new UserId(generate());
        LocalDateTime dateTime = LocalDateTime.now(ZoneId.systemDefault()).plusDays(30);

        TokenStorage tokenStorage = new TokenStorage();
        tokenStorage.put(new TokenRecord(new TokenId(generate()), token, userId, dateTime));

        UserStorage userStorage = new UserStorage();
        userStorage.put(new UserRecord(userId, username, "", new FolderId(generate())));

        return new GetUserRoute(tokenStorage, userStorage);
    }

    @Test
    @DisplayName("handle a valid request correctly.")
    void testValidRequest() {

        Username username = new Username("administrator");
        Token token = new Token(generate());

        GetUserRoute route = prepareRoute(username, token);

        String responseContent = (String) route.handle(mockRequest(token), mockResponse());

        JsonObject jsonObject = new Gson().fromJson(responseContent, JsonObject.class);

        assertWithMessage("The GetUserRoute return a user with incorrect username.")
                .that(jsonObject.get("name").getAsString())
                .isEqualTo(username.value());
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Request.class, mockRequest(new Token("")));
        tester.setDefault(Response.class, mockResponse());

        tester.testAllPublicConstructors(GetUserRoute.class);
        tester.testAllPublicInstanceMethods(new GetUserRoute(new TokenStorage(), new UserStorage()));
    }
}
