import UploadFileAction from '../../../../app/state/actions/upload-file-action';
import IsUploadFileInProgressMutator from '../../../../app/state/mutators/is-upload-file-in-progress-mutator';
import GetFilesAction from '../../../../app/state/actions/get-files-action';

const {module, test} = QUnit;

module('The UploadFileAction');

test('should call the uploadFile() method of the API Service.', async (assert) => {
  assert.expect(9);

  const folderId = 'tRZXiSHNRlgZluGQ';

  const file = new File([], 'file.txt');

  const apiServiceMock = {
    uploadFile: (folderId, formData) => {
      assert.strictEqual(folderId, folderId, 'The UploadFileAction should provide the correct folder ID to the API ' +
        'Service.');
      assert.strictEqual(formData.get('file'), file, 'The UploadFileAction should provide the correct file to the ' +
        'API Service.');
    },
  };

  const stateManagerMock = {
    mutate(mutator) {
      assert.ok(mutator instanceof IsUploadFileInProgressMutator, 'The UploadFileAction should provide instances of ' +
        'the IsUploadFileInProgressMutator to the state manager.');
      assert.step(`${mutator._folderId} - ${mutator._isLoading}`);
    },

    dispatch(action) {
      assert.ok(action instanceof GetFilesAction, 'The UploadFileAction should provide an instance of the ' +
        'GetFilesAction to the state manager in case the upload folder ID matches the current folder ID.');
      assert.strictEqual(action._folderId, folderId, 'The UploadFileAction should provide correct folderId to the ' +
        'GetFilesAction.');
    },

    state: {
      locationParameters: {folderId},
    },
  };

  const action = new UploadFileAction(folderId, file);
  await action.apply(stateManagerMock, apiServiceMock);

  assert.verifySteps([
    `${folderId} - true`,
    `${folderId} - false`,
  ], 'The UploadFileAction should provide correct mutators to the state manager.');
});
