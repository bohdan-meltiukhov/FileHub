import UserNameLoadingErrorMutator from '../../../../app/state/mutators/user-name-loading-error-mutator';
import GeneralServerError from '../../../../app/models/errors/general-server-error';

const {module, test} = QUnit;

export default module('The UserNameLoadingErrorMutator', () => {
  test('should set the provided error correctly.', (assert) => {
    const error = new GeneralServerError('Internal server error');
    const state = {};

    const mutator = new UserNameLoadingErrorMutator(error);
    mutator.apply(state);

    assert.strictEqual(state.userNameLoadingError, error, 'The UserNameLoadingErrorMutator should set the error ' +
      'to the provided state correctly.');
  });
});
