import Action from '../action';
import UserNameMutator from '../../mutators/user-name-mutator';

/**
 * The action that gets the user data.
 */
export default class GetUserAction extends Action {
  /** @inheritdoc */
  apply(stateManager, apiService) {
    apiService.getUser()
      .then((userData) => {
        stateManager.mutate(new UserNameMutator(userData.name));
      });
  }
}
