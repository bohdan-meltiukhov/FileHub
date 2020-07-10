package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import io.javaclasses.filehub.api.File;
import io.javaclasses.filehub.api.Folder;
import io.javaclasses.filehub.api.FolderContent;

import java.lang.reflect.Type;

/**
 * A {@link JsonSerializer} for {@link FolderContent}.
 */
public class FolderContentSerializer implements JsonSerializer<FolderContent> {

    /**
     * A utility for turning Java {@link Object}s into {@link JsonElement}s.
     */
    private final Gson gson = createGson();

    /**
     * Turns a {@link FolderContent} object into a {@link JsonElement}.
     *
     * @param src       The source {@link FolderContent} object.
     * @param typeOfSrc The type of the source object.
     * @return The created {@link JsonElement}.
     */
    @Override
    public JsonElement serialize(FolderContent src, Type typeOfSrc, JsonSerializationContext context) {

        JsonArray jsonFolders = new JsonArray();
        src.folders().forEach(folder -> jsonFolders.add(gson.toJsonTree(folder, Folder.class)));

        JsonArray jsonFiles = new JsonArray();
        src.files().forEach(file -> jsonFiles.add(gson.toJsonTree(file, File.class)));

        JsonObject jsonFolderContent = new JsonObject();

        jsonFolderContent.add("folders", jsonFolders);
        jsonFolderContent.add("files", jsonFiles);

        return jsonFolderContent;
    }

    /**
     * Creates a Gson object with registered type adapters.
     *
     * @return The created Gson object.
     */
    private Gson createGson() {

        GsonBuilder gsonBuilder = new GsonBuilder();

        gsonBuilder.registerTypeAdapter(Folder.class, new FolderSerializer());
        gsonBuilder.registerTypeAdapter(File.class, new FileSerializer());

        return gsonBuilder.create();
    }
}
