import RemoveUploadFileInProgressMutator from '../../../../app/state/mutators/remove-upload-file-in-progress-mutator';

const {module, test} = QUnit;

export default module('The RemoveUploadFileInProgressMutator', () => {
  test('should remove the provided folder ID correctly.', (assert) => {
    const folderId = 'tRZXiSHNRlgZluGQ';
    const state = {
      foldersWithFileUploadInProgress: new Set([folderId]),
    };

    const mutator = new RemoveUploadFileInProgressMutator(folderId);
    mutator.apply(state);

    assert.deepEqual(Array.from(state.foldersWithFileUploadInProgress), [], 'The RemoveUploadFileInProgressMutator ' +
      'should remove the folder ID from the provided state correctly.');
  });
});
