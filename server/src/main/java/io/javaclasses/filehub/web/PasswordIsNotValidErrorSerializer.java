package io.javaclasses.filehub.web;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import io.javaclasses.filehub.api.PasswordIsNotValidException;

import java.lang.reflect.Type;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * The class for turning password validation errors into JSON elements.
 */
public class PasswordIsNotValidErrorSerializer implements JsonSerializer<PasswordIsNotValidException> {

    /**
     * Creates a JSON element from a password validation error.
     *
     * @param src       The object that needs to be converted to Json.
     * @param typeOfSrc The actual type of the source object.
     * @return A JsonElement corresponding to the provided Validation error.
     */
    @Override
    public JsonElement serialize(PasswordIsNotValidException src, Type typeOfSrc, JsonSerializationContext context) {

        checkNotNull(src);
        checkNotNull(typeOfSrc);
        checkNotNull(context);

        JsonObject jsonValidationError = new JsonObject();

        jsonValidationError.addProperty("field", "password");
        jsonValidationError.addProperty("message", src.getMessage());

        return jsonValidationError;
    }
}
