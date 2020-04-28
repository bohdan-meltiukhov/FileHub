import UploadFileAction from '../../../../app/state/actions/upload-file-action';

const {module, test} = QUnit;

module('The UploadFileAction');

test('should call the uploadFile() method of the API Service.', (assert) => {
  assert.expect(4);

  const folder = {
    id: 'tRZXiSHNRlgZluGQ',
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Images',
    itemsNumber: 20,
    type: 'folder',
  };

  const file = new File([], 'file.txt');

  const apiServiceMock = {
    uploadFile: (folderId, formData) => {
      assert.step('The file is uploaded.');
      assert.strictEqual(folderId, folder.id, 'The UploadFileAction should provide the correct folder ID to the API ' +
        'Service.');
      assert.strictEqual(formData.get('file'), file, 'The UploadFileAction should provide the correct file to the ' +
        'API Service.');
    },
  };

  const action = new UploadFileAction(folder, file);
  action.apply({}, apiServiceMock);

  assert.verifySteps(['The file is uploaded.'], 'The UploadFileAction should call the uploadFile() method of the ' +
    'API Service.');
});
