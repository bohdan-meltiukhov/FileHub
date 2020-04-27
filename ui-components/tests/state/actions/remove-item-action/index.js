import GetFilesAction from '../../../../app/state/actions/get-files-action';
import RemoveItemAction from '../../../../app/state/actions/remove-item-action';

const {module, test} = QUnit;

module('The RemoveItemAction');

test('should remove folders correctly.', (assert) => {
  assert.expect(4);

  const id = 'uExvhDL4YwkxnBVa';

  const folder = {
    id,
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  };

  const stateManagerMock = {
    dispatch(action) {
      assert.ok(action instanceof GetFilesAction, 'The RemoveItemAction should provide the GetFilesAction to ' +
        'the state manager.');
    },
  };

  const apiServiceMock = {
    deleteFolder(folderId) {
      return new Promise((resolve) => {
        assert.step('The folder is deleted.');
        assert.strictEqual(folderId, id, 'The RemoveItemAction should provide the correct folder id to the ' +
          'API Service.');
        resolve();
      });
    },
  };

  const action = new RemoveItemAction(folder);
  action.apply(stateManagerMock, apiServiceMock);

  assert.verifySteps(['The folder is deleted.'], 'The RemoveItemAction should call the deleteFolder() method of the ' +
    'API Service when the item type is folder.');
});

test('should remove files correctly.', (assert) => {
  assert.expect(4);

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
    },
  };

  const apiServiceMock = {
    deleteFile(fileId) {
      return new Promise((resolve) => {
        assert.step('The file is deleted.');
        assert.strictEqual(fileId, id, 'The RemoveItemAction should provide the correct file id to the ' +
          'API Service.');
        resolve();
      });
    },
  };

  const action = new RemoveItemAction(file);
  action.apply(stateManagerMock, apiServiceMock);

  assert.verifySteps(['The file is deleted.'], 'The RemoveItemAction should call the deleteFoile() method of the ' +
    'API Service when the item type is file.');
});
