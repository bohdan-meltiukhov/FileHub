import GetFilesAction from '../../../../app/state/actions/get-files-action';
import UpdateItemAction from '../../../../app/state/actions/update-item-action';

const {module, test} = QUnit;

module('The UpdateItemAction');

test('should update folders correctly.', async (assert) => {
  const folder = {
    id: '1',
    parentId: 'parent',
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  };

  const updateFolder = (folderItem) => {
    return new Promise((resolve) => {
      assert.step('The folder is updated.');
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
    },
  };

  const action = new UpdateItemAction(folder);
  action.apply(stateManagerMock, apiServiceMock);

  await updateFolder;
  assert.verifySteps(['The folder is updated.'], 'The UpdateItemAction should call the updateFolder() method of the ' +
    'API Service when the item type is folder.');
});

test('should update files correctly.', async (assert) => {
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
      assert.step('The file is updated.');
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
    },
  };

  const action = new UpdateItemAction(file);
  action.apply(stateManagerMock, apiServiceMock);

  await updateFile;
  assert.verifySteps(['The file is updated.'], 'The UpdateItemAction should call the updateFile() method of the ' +
    'API Service when the item type is file.');
});
