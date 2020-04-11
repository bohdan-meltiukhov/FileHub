import IsFileListLoadingMutator from '../../../../app/state/mutators/is-file-list-loading-mutator';

const {module, test} = QUnit;

module('The IsFileListLoadingMutator test');

test('should apply the isLoading flag to the state.', (assert) => {
  const flag = true;
  const mutator = new IsFileListLoadingMutator(flag);

  const state = {};
  mutator.apply(state);

  assert.strictEqual(state.isFileListLoading, flag, 'The is file list loading mutator should apply the ' +
    'isFileListLoading fla to the provided state.');
});
