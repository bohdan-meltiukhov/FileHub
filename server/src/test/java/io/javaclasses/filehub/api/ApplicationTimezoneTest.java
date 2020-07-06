package io.javaclasses.filehub.api;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;
import static io.javaclasses.filehub.api.ApplicationTimezone.getTimeZone;

@DisplayName("The ApplicationTimezone should")
class ApplicationTimezoneTest {

    @Test
    @DisplayName("provide a not-null zone identifier.")
    void testGetTimeZone() {

        assertWithMessage("The ApplicationTimezone didn't provide any zone identifier.")
                .that(getTimeZone())
                .isNotNull();
    }
}
