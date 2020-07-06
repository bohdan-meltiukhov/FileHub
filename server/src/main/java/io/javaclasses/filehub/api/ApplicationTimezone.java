package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;

import java.time.ZoneId;

/**
 * Stores the time zone all FileHub application classes should use.
 */
@Immutable
public final class ApplicationTimezone {

    /**
     * Provides the application time zone.
     *
     * @return The {@link ZoneId} of the application time zone.
     */
    public static ZoneId getTimeZone() {

        return ZoneId.of("UTC");
    }
}
