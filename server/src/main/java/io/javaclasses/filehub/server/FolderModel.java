package io.javaclasses.filehub.server;

public class FolderModel {

    private final String id;
    private String parentId;
    private String name;
    private int itemsNumber;

    public FolderModel(String id, String parentId, String name, int itemsNumber) {
        this.id = id;
        this.parentId = parentId;
        this.name = name;
        this.itemsNumber = itemsNumber;
    }

    @Override
    public String toString() {
        return "FolderModel{" +
                "id='" + id + '\'' +
                ", parentId='" + parentId + '\'' +
                ", name='" + name + '\'' +
                ", itemsNumber=" + itemsNumber +
                '}';
    }
}
