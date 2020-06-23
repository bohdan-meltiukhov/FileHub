package io.javaclasses.filehub.api;

/**
 * The interface for different processes.
 *
 * @param <C> The type of the command a process requires.
 * @param <T> The return type of a process' handle() method.
 */
public interface Process<C extends Command, T> {

    T handle(C command);
}
