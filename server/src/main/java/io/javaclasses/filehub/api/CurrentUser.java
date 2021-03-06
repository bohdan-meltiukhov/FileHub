package io.javaclasses.filehub.api;

import io.javaclasses.filehub.storage.UserRecord;

/**
 * A data structure for holding the current {@link UserRecord}.
 *
 * <p>This class uses the {@link ThreadLocal} storage.
 */
public final class CurrentUser {

    /**
     * The storage with the current {@link UserRecord}.
     */
    private static final ThreadLocal<UserRecord> localStorage = new ThreadLocal<>();

    /**
     * Changes the stored {@link UserRecord}.
     *
     * @param userRecord The new record.
     */
    public static void set(UserRecord userRecord) {

        localStorage.set(userRecord);
    }

    /**
     * Provides the stored user record.
     *
     * @return The current {@link UserRecord}.
     */
    public static UserRecord get() {

        return localStorage.get();
    }

    /**
     * Clears the current user storage to avoid memory leaks.
     */
    public static void clear() {

        localStorage.remove();
    }
}
