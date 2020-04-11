import FileListLoadingErrorMutator from '../../../../app/state/mutators/file-list-loading-error-mutator';

const {module, test} = QUnit;

module('The FileListLoadingErrorMutator test');

test('should apply the message.', (assert) => {
  const message = 'General Error!';
  const mutator = new FileListLoadingErrorMutator(message);

  const state = {};
  mutator.apply(state);
  assert.strictEqual(state.fileListLoadingError, message, 'The file list loading error mutator should apply the ' +
    'provided message to the state.');
});
