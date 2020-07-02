package io.javaclasses.filehub.storage;

import com.google.errorprone.annotations.Immutable;

import javax.annotation.Nullable;
import java.util.Objects;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link StorageRecord} with metadata about a folder in the FileHub web application.
 */
@Immutable
public final class FolderMetadataRecord implements StorageRecord<FolderId> {

    /**
     * An identifier of the folder.
     */
    private final FolderId folderId;

    /**
     * An identifier of the parent folder.
     */
    private final FolderId parentFolderId;

    /**
     * An identifier of the folder owner.
     */
    private final UserId userId;

    /**
     * The name of the folder.
     */
    private final String folderName;

    /**
     * The number of nested files or folders this folder contains.
     */
    private final int itemsNumber;

    /**
     * Creates an instance of the folder metadata record with set properties.
     *
     * @param folderId       The identifier of the folder.
     * @param parentFolderId The identifier of the parent folder.
     * @param userId         The identifier of the folder owner.
     * @param folderName     The name of the folder.
     * @param itemsNumber    The number of nested elements.
     */
    public FolderMetadataRecord(FolderId folderId, @Nullable FolderId parentFolderId, UserId userId, String folderName,
                                int itemsNumber) {

        this.folderId = checkNotNull(folderId);
        this.parentFolderId = parentFolderId;
        this.userId = checkNotNull(userId);
        this.folderName = checkNotNull(folderName);
        this.itemsNumber = itemsNumber;
    }

    /**
     * Indicates whether the provided object is a folder metadata record with the same fields.
     *
     * @param o The object to compare with.
     * @return True in case both objects are folders with the same fields.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof FolderMetadataRecord)) return false;
        FolderMetadataRecord that = (FolderMetadataRecord) o;
        return itemsNumber == that.itemsNumber &&
                folderId.equals(that.folderId) &&
                parentFolderId.equals(that.parentFolderId) &&
                userId.equals(that.userId) &&
                folderName.equals(that.folderName);
    }

    /**
     * Provides a hash code value of the folder metadata record.
     *
     * @return A hash code value that considers the folder fields.
     */
    @Override
    public int hashCode() {

        return Objects.hash(folderId, parentFolderId, userId, folderName, itemsNumber);
    }

    /**
     * Provides the identifier of the folder.
     *
     * @return The identifier of the folder.
     */
    @Override
    public FolderId id() {

        return folderId;
    }

    /**
     * The getter for the parent folder ID.
     *
     * @return The identifier of the parent folder.
     */
    public FolderId parentFolderId() {

        return parentFolderId;
    }

    /**
     * Provides the user identifier.
     *
     * @return The identifier of the folder owner.
     */
    public UserId userId() {

        return userId;
    }

    /**
     * Provides the name of the folder.
     *
     * @return The name of the folder.
     */
    public String folderName() {

        return folderName;
    }

    /**
     * Provides the number of nested items.
     *
     * @return The number of nested items.
     */
    public int itemsNumber() {

        return itemsNumber;
    }
}
