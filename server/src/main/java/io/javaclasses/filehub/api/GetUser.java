package io.javaclasses.filehub.api;

import com.google.errorprone.annotations.Immutable;

/**
 * A {@link Query} that represents intention of a client to get the current user.
 */
@Immutable
public final class GetUser extends AuthenticatedQuery {

}
