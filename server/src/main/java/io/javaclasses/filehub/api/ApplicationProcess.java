package io.javaclasses.filehub.api;

/**
 * A process in the FileHub server application which handles a {@link Command}.
 *
 * @param <C> The type of the command a process requires.
 * @param <T> The return type of a process' handle() method.
 */
public interface ApplicationProcess<C extends Command, T> {

    T handle(C command);
}
