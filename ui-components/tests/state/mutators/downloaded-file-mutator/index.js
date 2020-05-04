import DownloadedFileMutator from '../../../../app/state/mutators/downloaded-file-mutator';

const {module, test} = QUnit;

module('The DownloadedFileMutator');

test('should set the file to the state.', (assert) => {
  const file = new Blob(['Hello, world!'], {type: 'text/plain'});

  const mutator = new DownloadedFileMutator(file);

  const state = {};

  mutator.apply(state);

  assert.deepEqual(state.downloadedFile, file, 'The DownloadedFileMutator should set the file to the provided state ' +
    'correctly.');
});
