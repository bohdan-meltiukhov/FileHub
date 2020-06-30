package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.Password;
import io.javaclasses.filehub.api.PasswordHasher;
import io.javaclasses.filehub.api.Username;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static nl.jqno.equalsverifier.Warning.NULL_FIELDS;

@DisplayName("The UserRecord should")
public class UserRecordTest {

    private UserRecord prepareUserRecord() {

        return new UserRecord(new UserId(), new Username("administrator"), PasswordHasher.hash(
                new Password("Qazxsw123")));
    }

    @Test
    @DisplayName("not accept null pointers.")
    void testNullPointers() {

        NullPointerTester tester = new NullPointerTester();
        UserRecord userRecord = prepareUserRecord();
        tester.setDefault(Username.class, userRecord.username());

        tester.testAllPublicConstructors(UserRecord.class);
        tester.testAllPublicInstanceMethods(userRecord);
    }

    @Test
    @DisplayName("fulfill the equals() and hashCode() contract.")
    void testEqualsContract() {

        forClass(UserRecord.class)
                .suppress(NULL_FIELDS)
                .verify();
    }
}
