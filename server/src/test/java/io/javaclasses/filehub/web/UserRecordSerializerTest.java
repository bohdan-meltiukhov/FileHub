package io.javaclasses.filehub.web;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.Username;
import io.javaclasses.filehub.storage.FolderId;
import io.javaclasses.filehub.storage.UserId;
import io.javaclasses.filehub.storage.UserRecord;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("The UserRecordSerializer should")
class UserRecordSerializerTest {

    @Test
    @DisplayName("not accept null values.")
    void testNullPointers() {
        NullPointerTester tester = new NullPointerTester();
        tester.setDefault(UserRecord.class, new UserRecord(new UserId(""), new Username("administrator"),
                "", new FolderId("")));

        tester.testAllPublicInstanceMethods(new UserRecordSerializer());
    }
}
