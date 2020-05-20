import Action from '../action';
import UserNameMutator from '../../mutators/user-name-mutator';
import IsUserNameLoadingMutator from '../../mutators/is-user-name-loading-mutator';
import UserNameLoadingErrorMutator from '../../mutators/user-name-loading-error-mutator';

/**
 * The action that gets the user data.
 */
export default class GetUserAction extends Action {
  /** @inheritdoc */
  async apply(stateManager, apiService) {
    stateManager.mutate(new IsUserNameLoadingMutator(true));
    try {
      const userData = await apiService.getUser();
      stateManager.mutate(new UserNameMutator(userData.name));
    } catch (e) {
      stateManager.mutate(new UserNameLoadingErrorMutator(e));
    } finally {
      stateManager.mutate(new IsUserNameLoadingMutator(false));
    }
  }
}
