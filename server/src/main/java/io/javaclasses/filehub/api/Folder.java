package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;

import javax.annotation.Nullable;
import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A data transfer object for a {@link FolderMetadataRecord}.
 *
 * @see <a href="https://martinfowler.com/eaaCatalog/dataTransferObject.html">Data Transfer Object</a>
 */
@Immutable
public final class Folder {

    /**
     * An identifier of the folder.
     */
    private final FolderId folderId;

    /**
     * An identifier of the parent folder.
     */
    private final FolderId parentFolderId;

    /**
     * The name of the folder.
     */
    private final FileSystemItemName folderName;

    /**
     * Creates a {@link Folder} instance.
     *
     * @param folderId       The identifier of the folder.
     * @param folderName     The name of the folder.
     * @param parentFolderId The identifier of the parent folder.
     */
    public Folder(FolderId folderId, FileSystemItemName folderName, @Nullable FolderId parentFolderId) {

        this.folderId = checkNotNull(folderId);
        this.parentFolderId = parentFolderId;
        this.folderName = checkNotNull(folderName);
    }

    /**
     * Creates a {@link Folder} instance from a {@link FolderMetadataRecord}.
     *
     * @param record      The {@link FolderMetadataRecord} to create from.
     * @return The created {@link Folder}.
     */
    public static Folder fromFolderMetadataRecord(FolderMetadataRecord record) {

        checkNotNull(record);
        return new Folder(record.id(), record.folderName(), record.parentFolderId());
    }

    /**
     * Indicates whether the provided object is a {@link Folder} with the same fields.
     *
     * @param o The object to compare with.
     * @return True in case both objects are folder with equal fields.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Folder)) return false;
        Folder folder = (Folder) o;
        return folderId.equals(folder.folderId) &&
                Objects.equals(parentFolderId, folder.parentFolderId) &&
                folderName.equals(folder.folderName);
    }

    /**
     * Provides a hash code value of a {@link Folder}.
     *
     * @return A hash code value that considers all folder fields.
     */
    @Override
    public int hashCode() {
        return Objects.hash(folderId, parentFolderId, folderName);
    }

    /**
     * Provides a string representation of a folder metadata record.
     *
     * @return A string representation of a folder metadata record.
     */
    @Override
    public String toString() {
        return "Folder{" +
                "folderId=" + folderId +
                ", parentFolderId=" + parentFolderId +
                ", folderName=" + folderName +
                '}';
    }

    /**
     * Provides the identifier of the folder.
     *
     * @return The identifier of the folder.
     */
    public FolderId folderId() {

        return folderId;
    }

    /**
     * The getter for the parent folder identifier.
     *
     * @return The identifier of the parent folder.
     */
    public FolderId parentFolderId() {

        return parentFolderId;
    }

    /**
     * Provides the name of the folder.
     *
     * @return The name of the folder.
     */
    public FileSystemItemName folderName() {

        return folderName;
    }
}
