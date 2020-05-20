import RenameItemLoadingErrorMutator from '../../../../app/state/mutators/rename-item-loading-error-mutator';

const {module, test} = QUnit;

module('The RenameItemLoadingErrorMutator');

test('should set the error to the state correctly.', (assert) => {
  const error = new Error('Something went wrong.');

  const mutator = new RenameItemLoadingErrorMutator(error);

  const state = {};

  mutator.apply(state);

  assert.strictEqual(state.renameItemLoadingError, error, 'The RenameItemLoadingErrorMutator should set the error to ' +
    'the provided state correctly.');
});
