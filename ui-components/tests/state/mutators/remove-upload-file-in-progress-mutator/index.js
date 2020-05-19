import RemoveUploadFileInProgressMutator from '../../../../app/state/mutators/remove-upload-file-in-progress-mutator';

const {module, test} = QUnit;

module('The RemoveUploadFileInProgressMutator');

test('should remove the provided folder ID correctly.', (assert) => {
  const folderId = 'tRZXiSHNRlgZluGQ';
  const state = {
    foldersWithFileUploadInProgress: [folderId],
  };

  const mutator = new RemoveUploadFileInProgressMutator(folderId);
  mutator.apply(state);

  assert.deepEqual(state.foldersWithFileUploadInProgress, [], 'The RemoveUploadFileInProgressMutator should ' +
    'remove the folder ID from the provided state correctly.');
});
