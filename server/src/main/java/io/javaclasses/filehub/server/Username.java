package io.javaclasses.filehub.server;

/**
 * The value object for username.
 */
public final class Username {

    /**
     * The name of a current.
     */
    private final String value;

    /**
     * Creates an instance of the Username class with set value.
     *
     * @param value - The name of a user.
     */
    public Username(String value) {
        this.value = value;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object obj) {

        if (!(obj instanceof Username)) {

            return false;
        }

        Username username = (Username) obj;

        return username.value.equals(value);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString() {

        return "Username: " + value;
    }

    /**
     * The getter for the username value.
     *
     * @return The stored username.
     */
    public String getValue() {
        return value;
    }
}
