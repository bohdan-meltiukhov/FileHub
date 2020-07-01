package io.javaclasses.filehub.storage;

/**
 * A {@link StorageRecord} with metadata about a folder in the FileHub web application.
 */
public class FolderMetadataRecord implements StorageRecord<FolderId> {

    /**
     * An identifier of the folder.
     */
    private final FolderId folderId;

    /**
     * An identifier of the parent folder.
     */
    private FolderId parentFolderId;

    /**
     * An identifier of the folder owner.
     */
    private final UserId userId;

    /**
     * The name of the folder.
     */
    private String folderName;

    /**
     * The number of nested files or folders this folder contains.
     */
    private int itemsNumber;

    /**
     * Creates an instance of the folder metadata record with set properties.
     *
     * @param folderId       The identifier of the folder.
     * @param parentFolderId The identifier of the parent folder.
     * @param userId         The identifier of the folder owner.
     * @param folderName     The name of the folder.
     * @param itemsNumber    The number of nested elements.
     */
    public FolderMetadataRecord(FolderId folderId, FolderId parentFolderId, UserId userId, String folderName,
                                int itemsNumber) {

        this.folderId = folderId;
        this.parentFolderId = parentFolderId;
        this.userId = userId;
        this.folderName = folderName;
        this.itemsNumber = itemsNumber;
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
     * Changes the parent folder ID.
     *
     * @param parentFolderId The new parent folder identifier.
     */
    public void setParentFolderId(FolderId parentFolderId) {

        this.parentFolderId = parentFolderId;
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
     * Changes the folder name.
     *
     * @param folderName The new folder name.
     */
    public void setFolderName(String folderName) {

        this.folderName = folderName;
    }

    /**
     * Provides the number of nested items.
     *
     * @return The number of nested items.
     */
    public int itemsNumber() {

        return itemsNumber;
    }

    /**
     * Changes the number of nested items.
     *
     * @param itemsNumber The new number of nested items.
     */
    public void setItemsNumber(int itemsNumber) {
        this.itemsNumber = itemsNumber;
    }
}
