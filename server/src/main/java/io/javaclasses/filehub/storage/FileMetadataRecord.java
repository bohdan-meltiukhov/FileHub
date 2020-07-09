package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.api.FileSize;
import io.javaclasses.filehub.api.FileSystemItemName;
import io.javaclasses.filehub.api.MimeType;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link StorageRecord} about metadata of a file in the FileHub application.
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
    private final FileSystemItemName fileName;

    /**
     * The {@link MimeType} of the file.
     */
    private final MimeType mimeType;

    /**
     * The {@link FileSize} in bytes.
     */
    private final FileSize fileSize;

    /**
     * An identifier of the file owner.
     */
    private final UserId userId;

    /**
     * An identifier of the parent {@link FolderMetadataRecord}.
     */
    private final FolderId parentFolderId;

    /**
     * Creates an instance of the FileMetadataRecord.
     *
     * @param fileId         An identifier of the file.
     * @param fileName       The name of the file.
     * @param mimeType       The {@link MimeType} of the file.
     * @param fileSize       The size of the file in bytes.
     * @param userId         An identifier of the file owner.
     * @param parentFolderId An identifier of the parent {@link FolderMetadataRecord}.
     */
    public FileMetadataRecord(FileId fileId, FileSystemItemName fileName, MimeType mimeType, FileSize fileSize,
                              UserId userId, FolderId parentFolderId) {

        this.fileId = checkNotNull(fileId);
        this.fileName = checkNotNull(fileName);
        this.mimeType = checkNotNull(mimeType);
        this.fileSize = checkNotNull(fileSize);
        this.userId = checkNotNull(userId);
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
                fileName.equals(that.fileName) &&
                mimeType == that.mimeType &&
                fileSize.equals(that.fileSize) &&
                userId.equals(that.userId) &&
                parentFolderId.equals(that.parentFolderId);
    }

    /**
     * Provides a hash code value of a {@link FileMetadataRecord}.
     *
     * @return The hash code that considers all {@link FileMetadataRecord} fields.
     */
    @Override
    public int hashCode() {

        return Objects.hash(fileId, fileName, mimeType, fileSize, userId, parentFolderId);
    }

    /**
     * Provides the name of the file.
     *
     * @return The file name.
     */
    public FileSystemItemName filename() {

        return fileName;
    }

    /**
     * Provides the {@link MimeType} of the file.
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
     * Provides an identifier of the file owner.
     *
     * @return An identifier of the file owner.
     */
    public UserId userId() {

        return userId;
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
