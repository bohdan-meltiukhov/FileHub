package io.javaclasses.filehub.storage;

import com.google.common.testing.NullPointerTester;
import io.javaclasses.filehub.api.IdGenerator;
import io.javaclasses.filehub.api.Password;
import io.javaclasses.filehub.api.Username;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.javaclasses.filehub.api.PasswordHasher.hash;
import static nl.jqno.equalsverifier.EqualsVerifier.forClass;
import static nl.jqno.equalsverifier.Warning.NULL_FIELDS;

@DisplayName("The UserRecord should")
public class UserRecordTest {

    private UserRecord prepareUserRecord() {

        return new UserRecord(new UserId(IdGenerator.generate()), new Username("administrator"),
                hash(new Password("Qazxsw123")), new FolderId(""));
    }

    @Test
    @DisplayName("not accept null pointers.")
    void testNullPointers() {

        NullPointerTester tester = new NullPointerTester();
        UserRecord userRecord = prepareUserRecord();
        tester.setDefault(Username.class, userRecord.username());
        tester.setDefault(UserId.class, new UserId(IdGenerator.generate()));
        tester.setDefault(FolderId.class, new FolderId(""));

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
