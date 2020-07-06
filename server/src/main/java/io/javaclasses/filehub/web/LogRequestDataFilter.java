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
     * Logs the request path, body and authorization header.
     *
     * @param request The request from the client.
     * @param response The object for creating the response.
     */
    @Override
    public void handle(Request request, Response response) {

        System.out.println("Inside LogRequestDataFilter");
        if (logger.isInfoEnabled()) {
            logger.info("Request to {} with body {} and Authorization header {}", request.matchedPath(),
                    request.body(), request.headers("Authorization"));
        }
    }
}
