package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javaclasses.filehub.api.CurrentUserNotSetException;
import io.javaclasses.filehub.api.GetUser;
import io.javaclasses.filehub.api.UserView;
import io.javaclasses.filehub.storage.UserRecord;
import org.slf4j.Logger;
import spark.Request;
import spark.Response;
import spark.Route;

import static org.apache.http.HttpStatus.SC_INTERNAL_SERVER_ERROR;
import static org.apache.http.HttpStatus.SC_OK;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * A {@link Route} that handles a get user request.
 */
public class GetUserRoute implements Route {

    /**
     * An slf4j logger.
     */
    private static final Logger logger = getLogger(RootFolderIdRoute.class);

    /**
     * A utility for serializing and deserializing Java objects into JSON.
     */
    private final Gson gson;

    /**
     * Creates an instance of the RootFolderIdRoute.
     */
    public GetUserRoute() {

        gson = createGson();
    }

    /**
     * Creates a Gson object with registered type adapters.
     *
     * @return The created Gson object.
     */
    private Gson createGson() {

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(UserRecord.class, new UserRecordSerializer());
        return gsonBuilder.create();
    }

    /**
     * Handles the get-user request.
     *
     * @param request  The request from the client.
     * @param response The object for modifying the response
     * @return The content to be set in the response
     */
    @Override
    public Object handle(Request request, Response response) {

        GetUser query = createQuery();
        UserView view = createView();

        try {
            UserRecord userRecord = view.process(query);

            if (logger.isDebugEnabled()) {
                logger.debug("The process handled the command successfully. User record: {}", userRecord);
            }

            response.status(SC_OK);
            return gson.toJson(userRecord, UserRecord.class);

        } catch (CurrentUserNotSetException exception) {

            if (logger.isWarnEnabled()) {
                logger.warn(exception.getMessage());
            }

            return SC_INTERNAL_SERVER_ERROR;
        }
    }

    /**
     * Creates a new {@link GetUser} query.
     *
     * @return The created query.
     */
    private GetUser createQuery() {

        return new GetUser();
    }

    /**
     * Creates a new {@link UserView}.
     *
     * @return The created view.
     */
    private UserView createView() {

        return new UserView();
    }
}
