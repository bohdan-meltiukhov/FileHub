import CreateFolderLoadingErrorMutator from '../../../../app/state/mutators/create-folder-loading-error-mutator';

const {module, test} = QUnit;

module('The CreateFolderLoadingErrorMutator');

test('should set the provided error to the state correctly.', (assert) => {
  const error = new Error('Something went wrong');
  const state = {};

  const mutator = new CreateFolderLoadingErrorMutator(error);
  mutator.apply(state);

  assert.strictEqual(state.createFolderLoadingError, error, 'The CreateFolderLoadingErrorMutator should set the ' +
    'error to the provided state correctly.');
});
