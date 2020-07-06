package io.javaclasses.filehub.web;

import org.slf4j.Logger;
import spark.Filter;
import spark.Request;
import spark.Response;

import static org.slf4j.LoggerFactory.getLogger;

/**
 * A {@link Filter} that logs the received request data.
 */
public class LogRequestDataFilter implements Filter {

    /**
     * An slf4j logger.
     */
    private static final Logger logger = getLogger(LogRequestDataFilter.class);

    /**
     * Logs the request path, body and authentication header.
     *
     * @param request The request from the client.
     * @param response The object for creating the response.
     */
    @Override
    public void handle(Request request, Response response) {

        if (logger.isInfoEnabled()) {
            logger.info("Received a request to '{}' with body '{}' and Authentication header '{}'", request.pathInfo(),
                    request.body(), request.headers("Authentication"));
        }
    }
}
