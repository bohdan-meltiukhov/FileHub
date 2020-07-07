package io.javaclasses.filehub.web;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import io.javaclasses.filehub.api.Password;
import io.javaclasses.filehub.api.RegisterUser;
import io.javaclasses.filehub.api.Username;

import java.lang.reflect.Type;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A deserializer for turning JSON elements into RegisterUser commands.
 */
public class RegisterUserDeserializer implements JsonDeserializer<RegisterUser> {

    /**
     * Creates an instance of the RegisterUser command from a JSON element.
     *
     * @param json    The Json with provided username and password.
     * @param typeOfT The type of the Object to deserialize to.
     * @return A deserialized instance of the RegisterUser command.
     * @throws JsonParseException if json is not in the expected format of RegisterUser.
     */
    @Override
    public RegisterUser deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
            throws JsonParseException {

        checkNotNull(json);
        checkNotNull(typeOfT);
        checkNotNull(context);

        try {

            JsonObject jsonObject = json.getAsJsonObject();

            Username username = new Username(jsonObject.get("username").getAsString());
            Password password = new Password(jsonObject.get("password").getAsString());

            return new RegisterUser(username, password);

        } catch (NullPointerException exception) {

            throw new JsonParseException(exception);
        }
    }
}
