package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;
import io.javaclasses.filehub.storage.UserId;

import javax.annotation.Nullable;

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
    private final FolderName folderName;

    /**
     * The number of nested files and folders in the current {@link Folder}.
     */
    private final NestedItems nestedItems;

    /**
     * Creates a {@link Folder} instance.
     *
     * @param folderId       The identifier of the folder.
     * @param folderName     The name of the folder.
     * @param nestedItems    The number of nested files and folder.
     * @param parentFolderId The identifier of the parent folder.
     */
    public Folder(FolderId folderId, FolderName folderName, NestedItems nestedItems,
                  @Nullable FolderId parentFolderId) {

        this.folderId = checkNotNull(folderId);
        this.parentFolderId = parentFolderId;
        this.folderName = checkNotNull(folderName);
        this.nestedItems = checkNotNull(nestedItems);
    }

    /**
     * Creates a {@link Folder} instance with null parent.
     *
     * <p>This constructor should be used to create parent folders.
     *
     * @param folderId    The identifier of the folder.
     * @param folderName  The name of the folder.
     * @param nestedItems The number of nested files and folder.
     */
    public Folder(FolderId folderId, UserId userId, FolderName folderName, NestedItems nestedItems) {

        this(folderId, folderName, nestedItems, null);
    }

    /**
     * Creates a {@link Folder} instance from a {@link FolderMetadataRecord}.
     *
     * @param record      The {@link FolderMetadataRecord} to create from.
     * @param nestedItems The number of nested files and folder.
     * @return The created {@link Folder}.
     */
    public static Folder fromFolderMetadataRecord(FolderMetadataRecord record, NestedItems nestedItems) {

        checkNotNull(record);
        checkNotNull(nestedItems);
        return new Folder(record.id(), record.folderName(), nestedItems, record.parentFolderId());
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
                ", folderName='" + folderName + '\'' +
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
    public FolderName folderName() {

        return folderName;
    }

    /**
     * Provides the number of nested files and folders the current folder contains.
     *
     * @return The number of nested elements.
     */
    public NestedItems nestedItems() {

        return nestedItems;
    }
}
