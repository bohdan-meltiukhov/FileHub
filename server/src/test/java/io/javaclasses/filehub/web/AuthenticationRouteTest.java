package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.LoggedInUserStorage;
import io.javaclasses.filehub.storage.UserStorage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import spark.Request;
import spark.Response;

@DisplayName("The AuthenticationRoute should")
class AuthenticationRouteTest {

    private NullPointerTester prepareTester() {

        NullPointerTester tester = new NullPointerTester();

        tester.setDefault(Response.class, new Response() {
        });
        tester.setDefault(Request.class, new Request() {
        });

        return tester;
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = prepareTester();

        tester.testAllPublicConstructors(AuthenticationRoute.class);
        tester.testAllPublicInstanceMethods(new AuthenticationRoute(new UserStorage(), new LoggedInUserStorage()));
    }
}
