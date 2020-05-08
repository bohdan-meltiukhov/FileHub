import IsDeleteItemLoadingMutator from '../../../../app/state/mutators/is-delete-item-loading-mutator';

const {module, test} = QUnit;

module('The IsDeleteItemLoadingMutator');

test('should set the isLoading flag correctly.', (assert) => {
  const itemId = 'folder';
  const isLoading = true;

  const mutator = new IsDeleteItemLoadingMutator(itemId, isLoading);

  const state = {};

  mutator.apply(state);

  assert.strictEqual(state.deleteItemId, itemId, 'The IsDeleteItemLoadingMutator should set the deleteItemId to the ' +
    'provided state correctly.');
  assert.strictEqual(state.isDeleteItemLoading, isLoading, 'The IsDeleteItemLoadingMutator should set the isLoading ' +
    'flag to the provided state correctly.');
});
