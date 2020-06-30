package io.javaclasses.filehub.web;

import com.google.gson.*;
import io.javaclasses.filehub.api.AuthenticateUser;
import io.javaclasses.filehub.api.Password;
import io.javaclasses.filehub.api.Username;

import java.lang.reflect.Type;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A deserializer for turning JSON elements into AuthenticateUser commands.
 */
public class AuthenticateUserDeserializer implements JsonDeserializer<AuthenticateUser> {

    /**
     * Creates an instance of the AuthenticateUser command from a JSON element.
     *
     * @param json    The Json with provided username and password.
     * @param typeOfT The type of the Object to deserialize to.
     * @return A deserialized instance of the AuthenticateUser command.
     * @throws JsonParseException if json is not in the expected format of RegisterUser.
     */
    @Override
    public AuthenticateUser deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
            throws JsonParseException {

        checkNotNull(json);
        checkNotNull(typeOfT);
        checkNotNull(context);

        JsonObject jsonObject = json.getAsJsonObject();

        Username username = new Username(jsonObject.get("username").getAsString());
        Password password = new Password(jsonObject.get("password").getAsString());

        return new AuthenticateUser(username, password);
    }
}
