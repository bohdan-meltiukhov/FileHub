package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.TokenRecord;
import io.javaclasses.filehub.storage.UserRecord;
import org.slf4j.Logger;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.slf4j.LoggerFactory.getLogger;

/**
 * An {@link View} that provides the identifier of the root folder for the current user.
 */
public class RootFolderIdView implements View<GetRootFolderId, FolderId> {

    /**
     * Finds the identifier of the root folder of a user.
     *
     * @param command The command with required data.
     * @return The required identifier.
     */
    @Override
    public FolderId process(GetRootFolderId command) {

        return command.currentUser().rootFolderId();
    }
}
