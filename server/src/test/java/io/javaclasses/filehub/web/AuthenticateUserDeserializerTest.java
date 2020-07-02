package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import com.google.gson.JsonElement;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The AuthenticateUserDeserializer should")
class AuthenticateUserDeserializerTest {

    private NullPointerTester prepareTester() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(JsonElement.class, new JsonElement() {
            @Override
            public JsonElement deepCopy() {
                return null;
            }
        });

        return tester;
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {

        NullPointerTester tester = prepareTester();

        tester.testAllPublicConstructors(AuthenticateUserDeserializer.class);
        tester.testAllPublicInstanceMethods(new AuthenticateUserDeserializer());
    }
}
