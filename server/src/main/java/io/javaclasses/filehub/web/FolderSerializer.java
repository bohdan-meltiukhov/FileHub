package io.javaclasses.filehub.web;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import io.javaclasses.filehub.api.Folder;

import java.lang.reflect.Type;

/**
 * A {@link JsonSerializer} for {@link Folder}s.
 */
public class FolderSerializer implements JsonSerializer<Folder> {

    /**
     * Turns a {@link Folder} into a {@link JsonElement}.
     *
     * @param src       The source {@link Folder} object.
     * @param typeOfSrc The type of the source object.
     * @return The created {@link JsonElement}.
     */
    @Override
    public JsonElement serialize(Folder src, Type typeOfSrc, JsonSerializationContext context) {

        JsonObject jsonFolder = new JsonObject();

        jsonFolder.addProperty("id", src.folderId().value());
        jsonFolder.addProperty("parentId", src.parentFolderId().value());
        jsonFolder.addProperty("name", src.folderName().value());

        return jsonFolder;
    }
}
