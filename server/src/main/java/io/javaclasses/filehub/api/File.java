package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.FileId;
import io.javaclasses.filehub.storage.FileMetadataRecord;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A data transfer object for a {@link FileMetadataRecord}.
 *
 * @see <a href="https://martinfowler.com/eaaCatalog/dataTransferObject.html">Data Transfer Object</a>
 */
@Immutable
public final class File {

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
     * Creates an instance of the {@link File}.
     *
     * @param fileId         An identifier of the file.
     * @param filename       The name of the file.
     * @param mimeType       The {@link MimeType} of the file.
     * @param fileSize       The size of the file in bytes.
     * @param parentFolderId An identifier of the parent {@link FolderMetadataRecord}.
     */
    public File(FileId fileId, Filename filename, MimeType mimeType, FileSize fileSize,
                FolderId parentFolderId) {

        this.fileId = checkNotNull(fileId);
        this.filename = checkNotNull(filename);
        this.mimeType = checkNotNull(mimeType);
        this.fileSize = checkNotNull(fileSize);
        this.parentFolderId = checkNotNull(parentFolderId);
    }

    /**
     * Creates an instance of a {@link File} from a {@link FileMetadataRecord}.
     *
     * @param record A {@link FileMetadataRecord} to create from.
     * @return The created file.
     */
    public static File fromFileMetadataRecord(FileMetadataRecord record) {

        return new File(record.id(), record.filename(), record.mimeType(), record.fileSize(), record.parentFolderId());
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
    public FileId fileId() {

        return fileId;
    }
}
