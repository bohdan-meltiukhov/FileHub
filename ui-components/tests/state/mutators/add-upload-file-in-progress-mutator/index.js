import AddUploadFileInProgressMutator from '../../../../app/state/mutators/add-upload-file-in-progress-mutator';

const {module, test} = QUnit;

module('The AddUploadFileInProgressMutator');

test('should set the provided folder ID correctly.', (assert) => {
  const folderId = 'tRZXiSHNRlgZluGQ';
  const state = {};

  const mutator = new AddUploadFileInProgressMutator(folderId);
  mutator.apply(state);

  assert.deepEqual(state.foldersWithFileUploadInProgress, [folderId], 'The AddUploadFileInProgressMutator should ' +
    'add the folder ID to the provided state correctly.');
});
