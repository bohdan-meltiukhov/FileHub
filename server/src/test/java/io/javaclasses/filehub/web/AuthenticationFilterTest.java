package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.TokenStorage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import spark.Request;
import spark.Response;

@DisplayName("The AuthenticationFilter should")
class AuthenticationFilterTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Response.class, new Response() {
        });
        tester.setDefault(Request.class, new Request() {
        });

        tester.testAllPublicConstructors(AuthenticationFilter.class);
        tester.testAllPublicInstanceMethods(new AuthenticationFilter(new TokenStorage()));
    }
}
