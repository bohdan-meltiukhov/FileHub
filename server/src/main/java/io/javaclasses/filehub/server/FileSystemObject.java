package io.javaclasses.filehub.server;

import java.util.Objects;

/**
 * The class that has fields common for file system objects, such as file and folder.
 */
public abstract class FileSystemObject {

    /**
     * The identifier of an item.
     */
    protected final String id;

    /**
     * The identifier of the parent item for the current element.
     */
    protected String parentId;

    /**
     * The name of a file system object.
     */
    protected String name;

    /**
     * Creates an instance of the FileSystemObject with set id, parentId and name.
     *
     * @param id       The identifier of the current item.
     * @param parentId The identifier of the parent element.
     * @param name     The name of the current item.
     */
    public FileSystemObject(String id, String parentId, String name) {

        this.id = id;
        this.parentId = parentId;
        this.name = name;
    }

    /**
     * Provides the item's ID.
     *
     * @return The identifier of the current item.
     */
    public String getId() {

        return id;
    }

    /**
     * Provides the item's parent's ID.
     *
     * @return The identifier of the item's parent.
     */
    public String getParentId() {

        return parentId;
    }

    /**
     * Changes the identifier of the parent folder.
     *
     * @param parentId The parent folder's ID.
     */
    public void setParentId(String parentId) {

        this.parentId = parentId;
    }

    /**
     * Provides the name of the item.
     *
     * @return The name of the current item.
     */
    public String getName() {

        return name;
    }

    /**
     * Changes the file system object's name.
     *
     * @param name The new item's name.
     */
    public void setName(String name) {

        this.name = name;
    }

    /**
     * Indicates whether the provided object is a file system object and has equal id, parent ID and name.
     *
     * @param o The object with which to compare.
     * @return True if the id, parentId and name are equal for both objects.
     */
    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (!(o instanceof FileSystemObject)) return false;

        FileSystemObject that = (FileSystemObject) o;
        return id.equals(that.id) &&
                parentId.equals(that.parentId) &&
                name.equals(that.name);
    }

    /**
     * Provides a hash code value for the file system object.
     *
     * @return A hash code value that considers id, parentId and name.
     */
    @Override
    public int hashCode() {

        return Objects.hash(id, parentId, name);
    }
}
