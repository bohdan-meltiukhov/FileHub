package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;

import java.util.Arrays;
import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link StorageRecord} with content of a file in the FileHub application.
 */
@Immutable
public final class FileContentRecord implements StorageRecord<FileId> {

    /**
     * An identifier of the file.
     */
    private final FileId identifier;

    /**
     * A content of the file.
     */
    private final byte[] content;

    /**
     * Creates a FileContentRecord instance with set fields.
     *
     * @param identifier An identifier of the file.
     * @param content A content of the file.
     */
    public FileContentRecord(FileId identifier, byte[] content) {

        this.identifier = checkNotNull(identifier);
        this.content = checkNotNull(content);
    }

    /**
     * Provides a string representation of the FileContentRecord.
     *
     * @return A string representation of the FileContentRecord.
     */
    @Override
    public String toString() {
        return "FileContentRecord{" +
                "identifier=" + identifier +
                '}';
    }

    /**
     * Indicates whether the provided object is a file content record with the same identifier and content.
     *
     * @param o The object to compare with.
     * @return True if both objects are file content records with equal identifier and content.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof FileContentRecord)) return false;
        FileContentRecord that = (FileContentRecord) o;
        return identifier.equals(that.identifier) &&
                Arrays.equals(content, that.content);
    }

    /**
     * Provides a hash code value for the file content record.
     *
     * @return A hash code value that considers the file identifier and content.
     */
    @Override
    public int hashCode() {
        int result = Objects.hash(identifier);
        result = 31 * result + Arrays.hashCode(content);
        return result;
    }

    /**
     * Provides an identifier of the file.
     *
     * @return The file identifier.
     */
    @Override
    public FileId id() {

        return null;
    }

    /**
     * Provides a content of the file.
     *
     * @return The file content.
     */
    public byte[] content() {

        return content;
    }
}
