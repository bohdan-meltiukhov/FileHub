import CreateFolderErrorMutator from '../../../../app/state/mutators/create-folder-error-mutator';

const {module, test} = QUnit;

module('The CreateFolderErrorMutator');

test('should set the provided error to the state correctly.', (assert) => {
  const error = new Error('Something went wrong');
  const state = {};

  const mutator = new CreateFolderErrorMutator(error);
  mutator.apply(state);

  assert.strictEqual(state.createFolderError, error, 'The CreateFolderErrorMutator should set the ' +
    'error to the provided state correctly.');
});
