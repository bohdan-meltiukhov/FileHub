import DownloadFileAction from '../../../../app/state/actions/download-file-action';

const {module, test} = QUnit;

export default module('The DownloadFileAction', () => {
  test('should download the required file.', async (assert) => {
    assert.expect(8);

    const fileItem = {
      id: 'zHPz1GsbO9Kq8Xt0',
      parentId: 'tRZXiSHNRlgZluGQ',
      name: 'my_friends.png',
      mimeType: 'image',
      size: 16,
      type: 'file',
    };

    const file = new Blob(['Hello, world!'], {type: 'text/plain'});

    const apiServiceMock = {
      getFile: (id) => {
        assert.strictEqual(id, fileItem.id, 'The DownloadFileAction should provide correct fileId to the apiService.');

        return new Promise((resolve) => {
          resolve(file);
        });
      },
    };

    const stateManagerMock = {
      mutate: (mutator) => {
        assert.step(mutator.constructor.name);
        assert.strictEqual(mutator._fileId, fileItem.id, 'The DownloadFileAction should provide correct file IDs to ' +
          'the mutators.');
      },
    };

    const downloadFileServiceMock = {
      download: (fileBlob, fileName) => {
        assert.deepEqual(fileBlob, file, 'The DownloadFileAction should provide correct file blob to the Download ' +
          'File Service.');
        assert.strictEqual(fileName, fileItem.name, 'The DownloadFileAction should provide correct file name to the ' +
          'DownloadFileService.');
      },
    };

    const action = new DownloadFileAction(fileItem, downloadFileServiceMock);
    await action.apply(stateManagerMock, apiServiceMock);

    assert.verifySteps([
      'AddDownloadFileInProgressMutator',
      'RemoveDownloadFileInProgressMutator',
    ], 'The DownloadFileAction should provide mutators to the state manager in the correct order.');
  });
});
