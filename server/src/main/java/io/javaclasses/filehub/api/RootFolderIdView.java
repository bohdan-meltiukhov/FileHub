package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.FolderMetadataRecord;

/**
 * A {@link View} that provides the identifier of the root {@link FolderMetadataRecord} for the {@link CurrentUser}.
 */
public class RootFolderIdView implements View<GetRootFolderId, FolderId> {

    /**
     * Finds the identifier of the root folder of a user.
     *
     * @param view The view with required data.
     * @return The required identifier.
     */
    @Override
    public FolderId process(GetRootFolderId view) {

        return view.currentUser().rootFolderId();
    }
}
