package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static com.google.common.base.Charsets.UTF_8;
import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("The PasswordHasher should")
class PasswordHasherTest {

    @Test
    @DisplayName("generate MD5 hashes correctly.")
    void testHash() {

        Password password = new Password("Qwerty123");

        try {

            MessageDigest messageDigest = MessageDigest.getInstance("MD5");
            messageDigest.update(password.value().getBytes(UTF_8));
            byte[] digest = messageDigest.digest();
            String hash = String.format("%032x", new BigInteger(1, digest));

            assertWithMessage("The PasswordHasher generated incorrect MD5 hash.")
                    .that(PasswordHasher.hash(password))
                    .isEqualTo(hash);

        } catch (NoSuchAlgorithmException e) {

            throw new RuntimeException(e);
        }
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();

        tester.testAllPublicConstructors(PasswordHasher.class);
        tester.testAllPublicStaticMethods(PasswordHasher.class);
    }
}
