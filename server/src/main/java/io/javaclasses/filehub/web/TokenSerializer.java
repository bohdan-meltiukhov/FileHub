package io.javaclasses.filehub.web;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import io.javaclasses.filehub.storage.Token;

import java.lang.reflect.Type;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A serializer for turning tokens into JSON elements.
 */
public class TokenSerializer implements JsonSerializer<Token> {

    /**
     * Creates a JSON element from a token.
     *
     * @param src The object that needs to be converted to Json.
     * @param typeOfSrc The actual type of the source object.
     * @return A JsonElement corresponding to the token.
     */
    @Override
    public JsonElement serialize(Token src, Type typeOfSrc, JsonSerializationContext context) {

        checkNotNull(src);
        checkNotNull(typeOfSrc);
        checkNotNull(context);

        JsonObject jsonValidationError = new JsonObject();

        jsonValidationError.addProperty("token", src.value());

        return jsonValidationError;
    }
}
