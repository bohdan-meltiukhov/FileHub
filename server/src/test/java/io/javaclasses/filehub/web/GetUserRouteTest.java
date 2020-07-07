package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.javaclasses.filehub.api.CurrentUser;
import io.javaclasses.filehub.api.Username;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import spark.Request;
import spark.Response;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.IdGenerator.generate;

@DisplayName("The GetUserRoute should")
class GetUserRouteTest {

    private Request mockRequest() {

        return new Request() {
        };
    }

    private Response mockResponse() {

        return new Response() {

            private int status;

            @Override
            public void status(int code) {

                status = code;
            }

            @Override
            public int status() {

                return status;
            }
        };
    }

    private void saveUserRecord(Username username) {

        UserRecord userRecord = new UserRecord(new UserId(generate()), username,
                "", new FolderId(""));
        CurrentUser.set(userRecord);
    }

    @Test
    @DisplayName("handle a valid request correctly.")
    void testValidRequest() {

        Username username = new Username("Benedict");
        saveUserRecord(username);

        GetUserRoute route = new GetUserRoute();

        JsonObject jsonObject = parseResponse(route.handle(mockRequest(), mockResponse()));

        assertWithMessage("The GetUserRoute returned a user with incorrect username.")
                .that(jsonObject.get("name").getAsString())
                .isEqualTo(username.value());
    }

    private JsonObject parseResponse(Object response) {

        String responseContent = (String) response;
        return new Gson().fromJson(responseContent, JsonObject.class);
    }
}
