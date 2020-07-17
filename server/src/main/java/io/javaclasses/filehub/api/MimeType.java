package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.FileMetadataRecord;

/**
 * Enumerates all possible {@link FileMetadataRecord} mime types.
 */
public enum MimeType {

    IMAGE,
    BOOK,
    VIDEO,
    AUDIO,
    OTHER;

    /**
     * Provides a mime type that corresponds to the given content type.
     *
     * @param contentType The content type of a file.
     * @return The matching mime type.
     */
    public static MimeType fromContentType(String contentType) {

        if (contentType.equals("application/pdf") || contentType.equals("image/vnd.djvu")) {

            return BOOK;
        }
        if (contentType.startsWith("image")) {

            return IMAGE;
        }
        if (contentType.startsWith("video")) {

            return VIDEO;
        }
        if (contentType.startsWith("audio")) {

            return AUDIO;
        }
        return OTHER;
    }
}
