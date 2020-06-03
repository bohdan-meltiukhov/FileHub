import GetFilesAction from '../../../../app/state/actions/get-files-action';
import UpdateItemAction from '../../../../app/state/actions/update-item-action';

const {module, test} = QUnit;

export default module('The UpdateItemAction', () => {
  test('should update folders correctly.', async (assert) => {
    assert.expect(7);

    const folder = {
      id: '1',
      parentId: 'parent',
      name: 'Documents',
      itemsNumber: 20,
      type: 'folder',
    };

    const updateFolder = (folderItem) => {
      return new Promise((resolve) => {
        assert.deepEqual(folderItem, folder, 'The UpdateItemAction should provide the correct folder to ' +
          'the API Service.');
        resolve();
      });
    };

    const apiServiceMock = {
      updateFolder,
    };

    const stateManagerMock = {
      dispatch: (action) => {
        assert.ok(action instanceof GetFilesAction, 'The UpdateItemAction should provide the GetFilesAction to the ' +
          'state manager.');

        assert.strictEqual(action._folderId, folder.parentId, 'The UpdateItemAction should provide correct folderId ' +
          'to the GetFilesAction.');
      },

      mutate: (mutator) => {
        assert.step(mutator.constructor.name);

        assert.strictEqual(mutator._itemId, folder.id, 'The UpdateItemAction should provide correct item ID to the ' +
          'mutators.');
      },

      state: {
        locationParameters: {
          folderId: folder.parentId,
        },
      },
    };

    const action = new UpdateItemAction(folder);
    action.apply(stateManagerMock, apiServiceMock);

    await updateFolder;
    assert.verifySteps([
      'AddRenameItemInProgressMutator',
      'RemoveRenameItemInProgressMutator',
    ], 'The UpdateItemAction should provide correct mutators to the state manager.');
  });

  test('should update files correctly.', async (assert) => {
    assert.expect(7);

    const file = {
      id: 'rYol3zzsCYc561cV',
      parentId: 'uExvhDL4YwkxnBVa',
      name: 'Document.pdf',
      mimeType: 'book',
      size: 202,
      type: 'file',
    };

    const updateFile = (fileItem) => {
      return new Promise((resolve) => {
        assert.deepEqual(fileItem, file, 'The UpdateItemAction should provide the correct file to ' +
          'the API Service.');
        resolve();
      });
    };

    const apiServiceMock = {
      updateFile,
    };

    const stateManagerMock = {
      dispatch: (action) => {
        assert.ok(action instanceof GetFilesAction, 'The UpdateItemAction should provide the GetFilesAction to the ' +
          'state manager.');

        assert.strictEqual(action._folderId, file.parentId, 'The UpdateItemAction should provide correct folderId to ' +
          'the GetFilesAction.');
      },

      mutate: (mutator) => {
        assert.step(mutator.constructor.name);

        assert.strictEqual(mutator._itemId, file.id, 'The UpdateItemAction should provide correct item ID to the ' +
          'mutators.');
      },

      state: {
        locationParameters: {
          folderId: file.parentId,
        },
      },
    };

    const action = new UpdateItemAction(file);
    action.apply(stateManagerMock, apiServiceMock);

    await updateFile;
    assert.verifySteps([
      'AddRenameItemInProgressMutator',
      'RemoveRenameItemInProgressMutator',
    ], 'The UpdateItemAction should provide correct mutators to the state manager.');
  });
});
