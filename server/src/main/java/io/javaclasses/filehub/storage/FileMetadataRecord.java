package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.FileSize;
import io.javaclasses.filehub.api.Filename;
import io.javaclasses.filehub.api.MimeType;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link StorageRecord} about a File in the FileHub application.
 */
@Immutable
public final class FileMetadataRecord implements StorageRecord<FileId> {

    /**
     * An identifier of the file.
     */
    private final FileId fileId;

    /**
     * The name of the file.
     */
    private final Filename filename;

    /**
     * The {@link MimeType} of the file.
     */
    private final MimeType mimeType;

    /**
     * The {@link FileSize} in bytes.
     */
    private final FileSize fileSize;

    /**
     * An identifier of the parent {@link FolderMetadataRecord}.
     */
    private final FolderId parentFolderId;

    /**
     * Creates an instance of the FileMetadataRecord.
     *
     * @param fileId An identifier of teh file.
     * @param filename The name of teh file.
     * @param mimeType The {@link MimeType} of the file.
     * @param fileSize The size of the file in bytes.
     * @param parentFolderId An identifier of the parent {@link FolderMetadataRecord}.
     */
    public FileMetadataRecord(FileId fileId, Filename filename, MimeType mimeType, FileSize fileSize,
                              FolderId parentFolderId) {

        this.fileId = checkNotNull(fileId);
        this.filename = checkNotNull(filename);
        this.mimeType = checkNotNull(mimeType);
        this.fileSize = checkNotNull(fileSize);
        this.parentFolderId = checkNotNull(parentFolderId);
    }

    /**
     * Indicates whether the provided object if a {@link FileMetadataRecord} with the same fields.
     *
     * @param o The object to compare with.
     * @return True in case files are equal.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof FileMetadataRecord)) return false;
        FileMetadataRecord that = (FileMetadataRecord) o;
        return fileId.equals(that.fileId) &&
                filename.equals(that.filename) &&
                mimeType == that.mimeType &&
                fileSize.equals(that.fileSize) &&
                parentFolderId.equals(that.parentFolderId);
    }

    /**
     * Provides a hash code value of a {@link FileMetadataRecord}.
     *
     * @return The hash code that considers all {@link FileMetadataRecord} fields.
     */
    @Override
    public int hashCode() {

        return Objects.hash(fileId, filename, mimeType, fileSize, parentFolderId);
    }

    /**
     * Provides the name of the file.
     *
     * @return The file name.
     */
    public Filename filename() {

        return filename;
    }

    /**
     * Provides the {@link MimeType} of teh file.
     *
     * @return The type of the file.
     */
    public MimeType mimeType() {

        return mimeType;
    }

    /**
     * Provides the {@link FileSize} in bytes.
     *
     * @return The file size.
     */
    public FileSize fileSize() {

        return fileSize;
    }

    /**
     * Provides the identifier of the parent folder.
     *
     * @return The parent folder identifier.
     */
    public FolderId parentFolderId() {

        return parentFolderId;
    }

    /**
     * Provides the identifier of the file.
     *
     * @return The file identifier.
     */
    @Override
    public FileId id() {

        return fileId;
    }
}
