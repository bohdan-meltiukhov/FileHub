package io.javaclasses.filehub.api;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertWithMessage;

@DisplayName("The IdGenerator should")
class IdGeneratorTest {

    @Test
    @DisplayName("generate string values.")
    void testGenerate() {

        assertWithMessage("The IdGenerator returned null, though it shouldn't.")
                .that(IdGenerator.generate())
                .isNotNull();
    }
}
