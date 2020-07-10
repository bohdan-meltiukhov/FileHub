package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A {@link Command} that represents intention of a client to create a {@link FolderMetadataRecord} in the FileHub
 * application.
 */
@Immutable
public final class CreateFolder extends AuthenticatedCommand {

    /**
     * An identifier of the parent folder.
     */
    private final FolderId parentFolderId;

    /**
     * Creates an instance of the CreateFolder command with set parent folder identifier.
     *
     * @param parentFolderId An identifier of the parent folder.
     */
    public CreateFolder(FolderId parentFolderId) {

        this.parentFolderId = checkNotNull(parentFolderId);
    }

    /**
     * Provides a string representation of the CreateFolder command.
     *
     * @return A string representation of the CreateFolder command.
     */
    @Override
    public String toString() {
        return "CreateFolder{" +
                "parentFolderId=" + parentFolderId +
                '}';
    }

    /**
     * Provides the parent folder identifier.
     *
     * @return An identifier of the parent folder.
     */
    public FolderId parentFolderId() {

        return parentFolderId;
    }
}
