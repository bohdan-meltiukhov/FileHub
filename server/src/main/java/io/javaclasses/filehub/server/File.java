package io.javaclasses.filehub.server;

import java.util.Objects;

/**
 * The class that represents files.
 */
public final class File extends FileSystemObject {

    /**
     * The type of the file.
     *
     * <p>The mime type can take the following values:
     * <ul>
     *     <li>image
     *     <li>book
     *     <li>video
     *     <li>audio
     *     <li>stylesheet
     *     <li>other
     * </ul>
     */
    private String mimeType;

    /**
     * The size of the file in bytes.
     */
    private int size;

    /**
     * Creates an instance of file with set ID, parentId, name, mimeType and size.
     *
     * @param id       The identifier of the file.
     * @param parentId The ID of the parent folder.
     * @param name     The name of the file.
     * @param mimeType The type of the file (e.g. image, book, video, audio, stylesheet, other)
     * @param size     The size of the file in bytes.
     */
    public File(String id, String parentId, String name, String mimeType, int size) {

        super(id, parentId, name);

        this.mimeType = mimeType;
        this.size = size;
    }

    /**
     * Provides a string representation of the file.
     *
     * @return A string representation of the file.
     */
    @Override
    public String toString() {
        return "FileModel{" +
                "mimeType='" + mimeType + '\'' +
                ", size=" + size +
                ", id='" + id + '\'' +
                ", parentId='" + parentId + '\'' +
                ", name='" + name + '\'' +
                '}';
    }

    /**
     * Indicates whether the provided object is a file and has equal id, parent ID, name, mimeType and size of nested
     * items.
     *
     * @param o The object with which to compare.
     * @return True if file ID, parent ID, name, mimeType and size are equal for both files.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof File)) return false;
        if (!super.equals(o)) return false;
        File file = (File) o;
        return size == file.size &&
                mimeType.equals(file.mimeType);
    }

    /**
     * Provides a hash code value for the file.
     *
     * @return True if the file ID, parent ID, name, mime type and file size are equal for both files.
     */
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), mimeType, size);
    }

    /**
     * Provides the mime type of the file.
     *
     * @return The mime type of the current file.
     */
    public String getMimeType() {
        return mimeType;
    }

    /**
     * Changes the mime type of the file.
     *
     * <p>The mime type can take the following values:
     * <ul>
     *     <li>image
     *     <li>book
     *     <li>video
     *     <li>audio
     *     <li>stylesheet
     *     <li>other
     * </ul>
     *
     * @param mimeType The new mime type of the file.
     */
    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    /**
     * Provides the size of the file.
     *
     * @return The size of the current file in bytes.
     */
    public int getSize() {
        return size;
    }

    /**
     * Changes the size of the file.
     *
     * @param size The new size of the current file.
     */
    public void setSize(int size) {
        this.size = size;
    }
}
