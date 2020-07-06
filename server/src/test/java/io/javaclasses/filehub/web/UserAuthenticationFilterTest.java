package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.CurrentUser;
import io.javaclasses.filehub.storage.TokenStorage;
import io.javaclasses.filehub.storage.UserStorage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import spark.Request;
import spark.Response;

@DisplayName("The AuthenticationFilter should")
class UserAuthenticationFilterTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Response.class, new Response() {
        });
        tester.setDefault(Request.class, new Request() {
        });

        tester.testAllPublicConstructors(UserAuthenticationFilter.class);
        tester.testAllPublicInstanceMethods(new UserAuthenticationFilter(new TokenStorage(), new UserStorage()));
    }
}
