import IsRenameItemLoadingMutator from '../../../../app/state/mutators/is-rename-item-loading-mutator';

const {module, test} = QUnit;

module('The IsRenameItemLoadingMutator');

test('should set the isLoading flag correctly.', (assert) => {
  const isLoading = true;

  const mutator = new IsRenameItemLoadingMutator(isLoading);

  const state = {};

  mutator.apply(state);

  assert.strictEqual(state.isRenameItemLoading, isLoading, 'The IsRenameItemLoadingMutator should set the isLoading ' +
    'flag to the provided state correctly');
});
