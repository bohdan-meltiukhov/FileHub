package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static com.google.common.base.Charsets.UTF_8;
import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The hasher for {@link Password}.
 *
 * <p>This hasher uses the <a href="https://en.wikipedia.org/wiki/MD5">MD5</a> hashing algorithm.
 *
 * <p>The hasher is thread-safe.
 */
@Immutable
public class PasswordHasher {

    /**
     * Hashes the provided password.
     *
     * @param password The password to hash.
     * @return The password hashed value.
     */
    public static synchronized String hash(Password password) {

        checkNotNull(password);

        try {

            MessageDigest messageDigest = MessageDigest.getInstance("MD5");
            messageDigest.update(password.value().getBytes(UTF_8));
            byte[] digest = messageDigest.digest();
            return String.format("%032x", new BigInteger(1, digest));

        } catch (NoSuchAlgorithmException e) {

            throw new RuntimeException(e);
        }
    }
}
