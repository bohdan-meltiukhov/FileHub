package io.javaclasses.filehub.web;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import io.javaclasses.filehub.api.ValidationError;

import java.lang.reflect.Type;

/**
 * The class for turning validation errors into JSON elements.
 */
public class ValidationErrorSerializer implements JsonSerializer<ValidationError> {

    /**
     * Creates a JSON element from a validation error.
     *
     * @param src The object that needs to be converted to Json.
     * @param typeOfSrc The actual type of the source object.
     * @return A JsonElement corresponding to the provided Validation error.
     */
    @Override
    public JsonElement serialize(ValidationError src, Type typeOfSrc, JsonSerializationContext context) {

        JsonObject jsonValidationError = new JsonObject();

        jsonValidationError.addProperty("field", src.field());
        jsonValidationError.addProperty("message", src.getMessage());

        return jsonValidationError;
    }
}
