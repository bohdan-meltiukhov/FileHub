import DownloadFileErrorMutator from '../../../../app/state/mutators/download-file-error-mutator';

const {module, test} = QUnit;

module('The DownloadFileErrorMutator');

test('should add the provided error to the state.', (assert) => {
  const error = new Error('Oops!');
  const state = {};

  const mutator = new DownloadFileErrorMutator(error);
  mutator.apply(state);

  assert.strictEqual(state.downloadFileError, error, 'The DownloadFileErrorMutator should set the error to the ' +
    'provided state correctly.');
});
