package io.javaclasses.filehub.web;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import io.javaclasses.filehub.api.File;
import io.javaclasses.filehub.api.Folder;

import java.lang.reflect.Type;

/**
 * A {@link JsonSerializer} for {@link File}s.
 */
public class FileSerializer implements JsonSerializer<File> {

    /**
     * Turns a {@link File} into a {@link JsonElement}.
     *
     * @param src       The source {@link File} object.
     * @param typeOfSrc The type of the source object.
     * @return The created {@link JsonElement}.
     */
    @Override
    public JsonElement serialize(File src, Type typeOfSrc, JsonSerializationContext context) {

        JsonObject jsonFile = new JsonObject();

        jsonFile.addProperty("id", src.filename().value());
        jsonFile.addProperty("parentId", src.parentFolderId().value());
        jsonFile.addProperty("name", src.filename().value());
        jsonFile.addProperty("mimeType", src.mimeType().name().toLowerCase());
        jsonFile.addProperty("size", src.fileSize().value());
        jsonFile.addProperty("type", "file");

        return jsonFile;
    }
}
