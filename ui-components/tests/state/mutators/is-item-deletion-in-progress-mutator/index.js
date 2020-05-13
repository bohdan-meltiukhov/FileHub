import IsItemDeletionInProgressMutator from '../../../../app/state/mutators/is-item-deletion-in-progress-mutator';

const {module, test} = QUnit;

module('The IsItemDeletionInProgressMutator');

test('should set the isLoading flag correctly.', (assert) => {
  const itemId = 'folder';
  const isLoading = true;

  const mutator = new IsItemDeletionInProgressMutator(itemId, isLoading);

  const state = {};

  mutator.apply(state);

  assert.strictEqual(state.deleteItemId, itemId, 'The IsItemDeletionInProgressMutator should set the deleteItemId to ' +
    'the provided state correctly.');
  assert.strictEqual(state.isDeleteItemLoading, isLoading, 'The IsItemDeletionInProgressMutator should set the ' +
    'isLoading flag to the provided state correctly.');
});
