import Action from '../action';

/**
 * The action that logs the current user out.
 */
export default class LogOutAction extends Action {
  /** @inheritdoc */
  async apply(stateManager, apiService) {
    try {
      await apiService.logOut();
    } catch (e) {
      console.error(e);
    }
  }
}
