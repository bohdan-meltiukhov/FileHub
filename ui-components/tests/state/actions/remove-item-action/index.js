import GetFilesAction from '../../../../app/state/actions/get-files-action';
import RemoveItemAction from '../../../../app/state/actions/remove-item-action';

const {module, test} = QUnit;

module('The RemoveItemAction');

test('should remove folders correctly.', async (assert) => {
  assert.expect(7);

  const folder = {
    id: 'uExvhDL4YwkxnBVa',
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  };

  const stateManagerMock = {
    dispatch(action) {
      assert.ok(action instanceof GetFilesAction, 'The RemoveItemAction should provide the GetFilesAction to ' +
        'the state manager.');
      assert.strictEqual(action._folderId, folder.parentId, 'The RemoveItemAction should provide correct folder ID ' +
        'to the GetFilesAction.');
    },

    mutate(mutator) {
      assert.step(mutator.constructor.name);
      assert.strictEqual(mutator._itemId, folder.id, 'The RemoveItemAction should provide correct folder ID to the ' +
        'mutators.');
    },

    state: {
      locationParameters: {
        folderId: folder.parentId,
      },
    },
  };

  const apiServiceMock = {
    deleteFolder(folderId) {
      return new Promise((resolve) => {
        assert.strictEqual(folderId, folder.id, 'The RemoveItemAction should provide the correct folder id to the ' +
          'API Service.');
        resolve();
      });
    },
  };

  const action = new RemoveItemAction(folder);
  await action.apply(stateManagerMock, apiServiceMock);

  assert.verifySteps([
    `AddItemDeletionInProgressMutator`,
    `RemoveItemDeletionInProgressMutator`,
  ], 'The RemoveItemAction should provide correct mutators to the state manager.');
});

test('should remove files correctly.', async (assert) => {
  assert.expect(7);

  const id = 'ARqTPQ1XXUrFlaJe';

  const file = {
    id,
    parentId: 'tRZXiSHNRlgZluGQ',
    name: 'Montenegro.jpg',
    mimeType: 'image',
    size: 162,
    type: 'file',
  };

  const stateManagerMock = {
    dispatch(action) {
      assert.ok(action instanceof GetFilesAction, 'The RemoveItemAction should provide the GetFilesAction to ' +
        'the state manager.');
      assert.strictEqual(action._folderId, file.parentId, 'The RemoveItemAction should provide correct folder ID ' +
        'to the GetFilesAction.');
    },

    mutate(mutator) {
      assert.step(mutator.constructor.name);
      assert.strictEqual(mutator._itemId, file.id, 'The RemoveItemAction should provide correct item ID to the ' +
        'mutators.');
    },

    state: {
      locationParameters: {
        folderId: file.parentId,
      },
    },
  };

  const apiServiceMock = {
    deleteFile(fileId) {
      return new Promise((resolve) => {
        assert.strictEqual(fileId, id, 'The RemoveItemAction should provide the correct file id to the ' +
          'API Service.');
        resolve();
      });
    },
  };

  const action = new RemoveItemAction(file);
  await action.apply(stateManagerMock, apiServiceMock);

  assert.verifySteps([
    `AddItemDeletionInProgressMutator`,
    `RemoveItemDeletionInProgressMutator`,
  ], 'The RemoveItemAction should provide correct mutators to the state manager.');
});
