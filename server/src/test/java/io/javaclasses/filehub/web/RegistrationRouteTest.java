package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.storage.FolderMetadataStorage;
import io.javaclasses.filehub.storage.UserStorage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import spark.Request;
import spark.Response;

@DisplayName("The RegistrationRoute should")
class RegistrationRouteTest {

    private NullPointerTester prepareTester() {

        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(Response.class, new Response() {
        });
        tester.setDefault(Request.class, new Request() {
            @Override
            public String body() {
                return null;
            }
        });

        return tester;
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = prepareTester();

        tester.testAllPublicConstructors(RegistrationRoute.class);
        tester.testAllPublicInstanceMethods(new RegistrationRoute(new UserStorage(), new FolderMetadataStorage()));
    }
}
