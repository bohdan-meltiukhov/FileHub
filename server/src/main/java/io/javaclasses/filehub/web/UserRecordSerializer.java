package io.javaclasses.filehub.web;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import io.javaclasses.filehub.storage.UserRecord;

import java.lang.reflect.Type;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A serializer for turning user records into JSON elements.
 */
public class UserRecordSerializer implements JsonSerializer<UserRecord> {

    /**
     * Creates a JSON element from a user record.
     *
     * @param src       The object that needs to be converted to Json.
     * @param typeOfSrc The actual type of the source object.
     * @return A JsonElement corresponding to the user record.
     */
    @Override
    public JsonElement serialize(UserRecord src, Type typeOfSrc, JsonSerializationContext context) {

        checkNotNull(src);
        checkNotNull(typeOfSrc);
        checkNotNull(context);

        JsonObject jsonValidationError = new JsonObject();

        jsonValidationError.addProperty("name", src.username().value());

        return jsonValidationError;
    }
}
