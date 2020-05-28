import DownloadFileErrorMutator from '../../../../app/state/mutators/download-file-error-mutator';

const {module, test} = QUnit;

module('The DownloadFileErrorMutator');

test('should add the provided error to the state.', (assert) => {
  const file = {
    id: 'ARqTPQ1XXUrFlaJe',
    parentId: 'tRZXiSHNRlgZluGQ',
    name: 'Montenegro.jpg',
    mimeType: 'image',
    size: 162,
    type: 'file',
  };

  const error = new Error('Oops!');
  const state = {};

  const mutator = new DownloadFileErrorMutator(file, error);
  mutator.apply(state);

  assert.strictEqual(state.downloadFileError.error, error, 'The DownloadFileErrorMutator should set the error to the ' +
    'provided state correctly.');
  assert.strictEqual(state.downloadFileError.fileItem, file, 'The DownloadFileErrorMutator should set the file item ' +
    'to the provided state correctly.');
});
