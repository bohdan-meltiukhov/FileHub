import AddRenameItemInProgressMutator from '../../../../app/state/mutators/add-rename-item-in-progress-mutator';

const {module, test} = QUnit;

module('The AddRenameItemInProgressMutator');

test('should set the provided folder ID correctly.', (assert) => {
  const itemId = 'tRZXiSHNRlgZluGQ';
  const state = {};

  const mutator = new AddRenameItemInProgressMutator(itemId);
  mutator.apply(state);

  assert.deepEqual(Array.from(state.itemsWithRenameInProgress), [itemId], 'The ' +
    'AddRenameItemInProgressMutator should add the item ID to the provided state correctly.');
});
