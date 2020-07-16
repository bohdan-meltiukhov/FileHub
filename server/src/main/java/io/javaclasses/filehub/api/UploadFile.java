package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.FolderId;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link Command} that represents intention of a client to upload a file to the FileHub application.
 */
@Immutable
public final class UploadFile extends AuthenticatedCommand {

    /**
     * An identifier of the parent folder.
     */
    private final FolderId folderId;

    /**
     * A file data transfer object.
     */
    private final File file;

    /**
     * A content of the file.
     */
    private final byte[] fileContent;

    /**
     * Creates an instance of the UploadFile command with set folder identifier and file content.
     *
     * @param folderId    An identifier of the parent folder.
     * @param file        A file data transfer object.
     * @param fileContent A content of the file.
     */
    public UploadFile(FolderId folderId, File file, byte[] fileContent) {

        this.folderId = checkNotNull(folderId);
        this.file = checkNotNull(file);
        this.fileContent = checkNotNull(fileContent);
    }

    /**
     * Provides an identifier of the parent folder.
     *
     * @return The parent folder identifier.
     */
    public FolderId folderId() {

        return folderId;
    }

    /**
     * Provides a file data transfer object.
     *
     * @return A file data transfer object.
     */
    public File file() {

        return file;
    }

    /**
     * Provides a content of the file.
     *
     * @return The file content.
     */
    public byte[] fileContent() {

        return fileContent;
    }
}
