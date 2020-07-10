package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FolderId;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link Query} that represents intention of a client to retrieve the information about a particular folder.
 */
public class GetFolder extends AuthenticatedQuery {

    /**
     * An identifier of the required folder.
     */
    private final FolderId folderId;

    /**
     * Creates an instance of the GetFolder query.
     *
     * @param folderId An identifier of the required folder.
     */
    public GetFolder(FolderId folderId) {

        this.folderId = checkNotNull(folderId);
    }

    /**
     * Provides a string representation of the {@link GetFolder} query.
     *
     * @return A string representation of the {@link GetFolder} query.
     */
    @Override
    public String toString() {
        return "GetFolder{" +
                "folderId=" + folderId +
                '}';
    }

    /**
     * Provides an identifier of the required folder.
     *
     * @return The folder identifier.
     */
    public FolderId folderId() {

        return folderId;
    }
}
