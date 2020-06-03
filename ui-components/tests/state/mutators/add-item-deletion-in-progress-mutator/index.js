import AddItemDeletionInProgressMutator from '../../../../app/state/mutators/add-item-deletion-in-progress-mutator';

const {module, test} = QUnit;

module('The AddItemDeletionInProgressMutator');

test('should set the provided folder ID correctly.', (assert) => {
  const itemId = 'tRZXiSHNRlgZluGQ';
  const state = {};

  const mutator = new AddItemDeletionInProgressMutator(itemId);
  mutator.apply(state);

  assert.deepEqual(Array.from(state.itemsWithDeletionInProgress), [itemId], 'The ' +
    'AddItemDeletionInProgressMutator should add the item ID to the provided state correctly.');
});
