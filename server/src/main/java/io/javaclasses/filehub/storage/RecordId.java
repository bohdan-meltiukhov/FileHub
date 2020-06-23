package io.javaclasses.filehub.storage;

/**
 * A unique identifier for a {@link Record}.
 */
public interface RecordId {

    /**
     * Provides the identifier value.
     *
     * @return The value of an identifier.
     */
    String value();
}
