package io.javaclasses.filehub.api;

/**
 * An abstract base in the FileHub application which processes a {@link Query} from a client.
 *
 * @param <Q> The type of the query.
 * @param <T> The return type of a view.
 */
public interface View<Q extends Query, T> {

    /**
     * Retrieves the required data.
     *
     * @param query The query from a client.
     * @return The required data.
     */
    T process(Q query);
}
