package io.javaclasses.filehub.server;

import java.util.Objects;

/**
 * The class that represents folders.
 */
public final class Folder extends FileSystemObject {

    /**
     * The number of items this folder contains.
     */
    private int itemsNumber;

    /**
     * Creates an instance of folder with set id, parentId, name and number of items.
     *
     * @param id          The identifier of the current folder.
     * @param parentId    The identifier of the parent folder.
     * @param name        The name of the folder.
     * @param itemsNumber The number of nested items this folder contains.
     */
    public Folder(String id, String parentId, String name, int itemsNumber) {

        super(id, parentId, name);

        this.itemsNumber = itemsNumber;
    }

    /**
     * Provides a string representation of the folder.
     *
     * @return A string representation of the folder.
     */
    @Override
    public String toString() {

        return "FolderModel{" +
                "itemsNumber=" + itemsNumber +
                ", id='" + id + '\'' +
                ", parentId='" + parentId + '\'' +
                ", name='" + name + '\'' +
                '}';
    }

    /**
     * Indicates whether the provided object is a folder and has equal id, parent ID, name and number of nested items.
     *
     * @param o The object with which to compare.
     * @return True if the folder ID, parent ID, name and number of nested items are equal for both objects.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof Folder)) return false;
        if (!super.equals(o)) return false;

        Folder that = (Folder) o;
        return itemsNumber == that.itemsNumber;
    }

    /**
     * Provides a hash code value for the folder.
     *
     * @return A hash code value that considers the id, parentId, name and number of nested items.
     */
    @Override
    public int hashCode() {

        return Objects.hash(super.hashCode(), itemsNumber);
    }

    /**
     * Provides the number of nested items for the current folder.
     *
     * @return The number of items this folder contains.
     */
    public int getItemsNumber() {

        return itemsNumber;
    }

    /**
     * Changes the number of nested items.
     *
     * @param itemsNumber The number of items this folder contains.
     */
    public void setItemsNumber(int itemsNumber) {

        this.itemsNumber = itemsNumber;
    }
}
