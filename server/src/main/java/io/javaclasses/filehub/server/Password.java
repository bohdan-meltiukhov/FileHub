package io.javaclasses.filehub.server;

/**
 * The value object for a password.
 */
public final class Password {

    /**
     * The password for a user's account.
     */
    private final String value;

    /**
     * Creates an instance of the password object with set value.
     *
     * @param value The password for a user's account.
     */
    public Password(String value) {
        this.value = value;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object obj) {

        if (!(obj instanceof Password)) {

            return false;
        }

        Password password = (Password) obj;

        return password.value.equals(value);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString() {

        return "Password:" + value;
    }

    /**
     * The getter for the password value.
     *
     * @return The stored password.
     */
    public String getValue() {
        return value;
    }
}
