import Action from '../action';

/**
 * The action that logs the current user out.
 */
export default class LogOutAction extends Action {
  /** @inheritdoc */
  apply(stateManager, apiService) {
    apiService.logOut();
  }
}
