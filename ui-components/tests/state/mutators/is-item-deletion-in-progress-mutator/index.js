import IsItemDeletionInProgressMutator from '../../../../app/state/mutators/is-item-deletion-in-progress-mutator';

const {module, test} = QUnit;

module('The IsItemDeletionInProgressMutator');

test('should set the isLoading flag correctly.', (assert) => {
  assert.expect(2);

  const itemId = 'folder';
  const state = {};

  const mutator = new IsItemDeletionInProgressMutator(itemId, true);
  mutator.apply(state);

  assert.deepEqual(state.itemsWithDeletionInProgress, [itemId], 'The IsItemDeletionInProgressMutator should add ' +
    'the deleteItemId to the itemsWithDeletionInProgress state field correctly.');

  const removeMutator = new IsItemDeletionInProgressMutator(itemId, false);
  removeMutator.apply(state);

  assert.deepEqual(state.itemsWithDeletionInProgress, [], 'The IsItemDeletionInProgressMutator should remove ' +
    'the deleteItemId from the itemsWithDeletionInProgress state field correctly.');
});
