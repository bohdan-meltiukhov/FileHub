package io.javaclasses.filehub.api;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("The NestedItems should")
class NestedItemsTest {

    @Test
    @DisplayName("not accept negative values.")
    void testWithNegativeValue() {

        assertThrows(InvalidNumberOfNestedItemsException.class, () -> new NestedItems(-5),
                "The NestedItems constructor didn't throw an exception for a negative file size, " +
                        "though it should have.");
    }

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        new NullPointerTester().testAllPublicConstructors(NestedItems.class);
    }
}
