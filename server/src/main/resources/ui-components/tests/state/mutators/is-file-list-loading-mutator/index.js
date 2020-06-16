import IsFileListLoadingMutator from '../../../../app/state/mutators/is-file-list-loading-mutator';

const {module, test} = QUnit;

export default module('The IsFileListLoadingMutator', () => {
  test('should apply the isLoading flag to the state.', (assert) => {
    const flag = true;
    const mutator = new IsFileListLoadingMutator(flag);

    const state = {};
    mutator.apply(state);

    assert.strictEqual(state.isFileListLoading, flag, 'The is file list loading mutator should apply the ' +
      'isFileListLoading flag to the provided state.');
  });
});
