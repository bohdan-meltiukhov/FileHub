package io.javaclasses.filehub.web;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import io.javaclasses.filehub.api.UsernameValidationException;

import java.lang.reflect.Type;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The class for turning username validation errors into JSON elements.
 */
public class UsernameValidationErrorSerializer implements JsonSerializer<UsernameValidationException> {

    /**
     * Creates a JSON element from a username validation error.
     *
     * @param src The object that needs to be converted to Json.
     * @param typeOfSrc The actual type of the source object.
     * @return A JsonElement corresponding to the provided Validation error.
     */
    @Override
    public JsonElement serialize(UsernameValidationException src, Type typeOfSrc, JsonSerializationContext context) {

        checkNotNull(src);
        checkNotNull(typeOfSrc);
        checkNotNull(context);

        JsonObject jsonValidationError = new JsonObject();

        jsonValidationError.addProperty("field", "username");
        jsonValidationError.addProperty("message", src.getMessage());

        return jsonValidationError;
    }
}
