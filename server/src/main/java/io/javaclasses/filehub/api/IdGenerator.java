package io.javaclasses.filehub.api;

import java.util.UUID;

/**
 * The generator of unique {@link Record} identifiers.
 *
 * <p>The generator is thread-safe.
 */
public class IdGenerator {

    /**
     * Generates a random unique string identifier.
     *
     * @return The generated identifier.
     */
    public static synchronized String generate() {

        return UUID.randomUUID().toString();
    }
}
