import IsUploadFileInProgressMutator from '../../../../app/state/mutators/is-upload-file-in-progress-mutator';

const {module, test} = QUnit;

module('The IsUploadFileInProgressMutator');

test('should set the loading folder ID correctly.', (assert) => {
  const folderId = 'tRZXiSHNRlgZluGQ';
  const state = {};

  const mutator = new IsUploadFileInProgressMutator(folderId, true);
  mutator.apply(state);

  assert.deepEqual(state.foldersWithFileUploadInProgress, [folderId], 'The IsUploadFileInProgressMutator should add ' +
    'the folderId to the provided state if the file is loading.');

  const removeMutator = new IsUploadFileInProgressMutator(folderId, false);
  removeMutator.apply(state);

  assert.deepEqual(state.foldersWithFileUploadInProgress, [], 'The IsUploadFileInProgressMutator should remove the ' +
    'folderId from the provided state if the file is no longer loading.');
});
