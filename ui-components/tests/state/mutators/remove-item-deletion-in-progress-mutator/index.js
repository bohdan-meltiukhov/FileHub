import RemoveItemDeletionInProgressMutator
  from '../../../../app/state/mutators/remove-item-deletion-in-progress-mutator';

const {module, test} = QUnit;

module('The RemoveItemDeletionInProgressMutator');

test('should remove the provided folder ID correctly.', (assert) => {
  const itemId = 'tRZXiSHNRlgZluGQ';
  const state = {
    itemsWithDeletionInProgress: new Set([itemId]),
  };

  const mutator = new RemoveItemDeletionInProgressMutator(itemId);
  mutator.apply(state);

  assert.deepEqual(Array.from(state.itemsWithDeletionInProgress), [], 'The RemoveItemDeletionInProgressMutator ' +
    'should remove the item ID from the provided state correctly.');
});
