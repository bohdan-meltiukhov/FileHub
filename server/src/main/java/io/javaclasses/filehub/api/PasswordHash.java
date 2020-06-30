package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import static com.google.common.base.Charsets.UTF_8;
import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A value object for a hashed password.
 *
 * <p>Uses the MD5 hashing algorithm.
 *
 * @see <a href="https://en.wikipedia.org/wiki/MD5">MD5 - Wikipedia</a>
 */
@Immutable
public final class PasswordHash {

    /**
     * The password hash as an array of bytes.
     */
    private final byte[] digest;

    /**
     * Creates an instance of the password hash with set digest.
     *
     * @param password The password to hash.
     */
    public PasswordHash(Password password) {

        checkNotNull(password);

        try {

            MessageDigest messageDigest = MessageDigest.getInstance("MD5");
            messageDigest.update(password.value().getBytes(UTF_8));
            digest = messageDigest.digest();

        } catch (NoSuchAlgorithmException e) {

            throw new RuntimeException("MD5 hashing failed.");
        }
    }

    /**
     * Indicates whether the provided object is a password hash and has the same value.
     *
     * @param o The object to compare with.
     * @return True if both password hash objects are equal.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof PasswordHash)) return false;
        PasswordHash that = (PasswordHash) o;
        return Arrays.equals(digest, that.digest);
    }

    /**
     * Provides a hash code value for the password hash.
     *
     * @return The hash code value that considers the password hash.
     */
    @Override
    public int hashCode() {

        return Arrays.hashCode(digest);
    }

    /**
     * Provides a string representation of the password hash.
     *
     * @return A string representation of the password hash.
     */
    @Override
    public String toString() {

        String hash = String.format("%032x", new BigInteger(1, digest));

        return "PasswordHash:" + hash;
    }

    /**
     * Provides the password hash value.
     *
     * @return The stored password hash.
     */
    public byte[] digest() {

        return digest;
    }
}
