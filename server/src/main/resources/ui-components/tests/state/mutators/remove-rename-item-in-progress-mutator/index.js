import RemoveRenameItemInProgressMutator from '../../../../app/state/mutators/remove-rename-item-in-progress-mutator';

const {module, test} = QUnit;

export default module('The RemoveRenameItemInProgressMutator', () => {
  test('should remove the provided folder ID correctly.', (assert) => {
    const itemId = 'tRZXiSHNRlgZluGQ';
    const state = {
      itemsWithRenameInProgress: new Set([itemId]),
    };

    const mutator = new RemoveRenameItemInProgressMutator(itemId);
    mutator.apply(state);

    assert.deepEqual(Array.from(state.itemsWithRenameInProgress), [], 'The RemoveRenameItemInProgressMutator ' +
      'should remove the item ID from the provided state correctly.');
  });
});
