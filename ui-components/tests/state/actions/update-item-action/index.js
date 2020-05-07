import GetFilesAction from '../../../../app/state/actions/get-files-action';
import UpdateItemAction from '../../../../app/state/actions/update-item-action';
import IsRenameItemLoadingMutator from '../../../../app/state/mutators/is-rename-item-loading-mutator';

const {module, test} = QUnit;

module('The UpdateItemAction');

test('should update folders correctly.', async (assert) => {
  assert.expect(5);

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

      assert.strictEqual(action._folderId, folder.parentId, 'The UpdateItemAction should provide correct folderId to ' +
        'the GetFilesAction.');
    },

    mutate: (mutator) => {
      assert.step(mutator.constructor.name + ': ' + mutator._isLoading);
    },
  };

  const action = new UpdateItemAction(folder);
  action.apply(stateManagerMock, apiServiceMock);

  await updateFolder;
  assert.verifySteps([
    'IsRenameItemLoadingMutator: true',
    'IsRenameItemLoadingMutator: false',
  ], 'The UpdateItemAction should provide correct mutators to the state manager.');
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
      assert.step(mutator.constructor.name + ': ' + mutator._isLoading);
    },
  };

  const action = new UpdateItemAction(file);
  action.apply(stateManagerMock, apiServiceMock);

  await updateFile;
  assert.verifySteps([
    'IsRenameItemLoadingMutator: true',
    'IsRenameItemLoadingMutator: false',
  ], 'The UpdateItemAction should provide correct mutators to the state manager.');
});
