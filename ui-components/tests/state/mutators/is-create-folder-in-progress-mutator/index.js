import IsCreateFolderInProgressMutator from '../../../../app/state/mutators/is-create-folder-in-progress-mutator';

const {module, test} = QUnit;

module('The IsCreateFolderInProgressMutator');

test('should set the isLoading flag correctly.', (assert) => {
  const isInProgress = true;
  const state = {};

  const mutator = new IsCreateFolderInProgressMutator(isInProgress);
  mutator.apply(state);

  assert.strictEqual(state.isCreateFolderInProgress, isInProgress, 'The IsCreateFolderInProgressMutator should set ' +
    'the isInProgress flag to the provided state correctly.');
});
