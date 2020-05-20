import IsUserNameLoadingMutator from '../../../../app/state/mutators/is-user-name-loading-mutator';

const {module, test} = QUnit;

module('The IsUserNameLoadingMutator');

test('should set the isLoading flag correctly.', (assert) => {
  const isLoading = true;
  const state = {};

  const mutator = new IsUserNameLoadingMutator(isLoading);
  mutator.apply(state);

  assert.strictEqual(state.isUserNameLoading, isLoading, 'The IsUserNameLoadingMutator should set the isLoading ' +
    'flag to the provided state correctly.');
});
