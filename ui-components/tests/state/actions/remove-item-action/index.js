import GetFilesAction from '../../../../app/state/actions/get-files-action';
import RemoveItemAction from '../../../../app/state/actions/remove-item-action';
import IsDeleteItemLoadingMutator from '../../../../app/state/mutators/is-delete-item-loading-mutator';

const {module, test} = QUnit;

module('The RemoveItemAction');

test('should remove folders correctly.', (assert) => {
  assert.expect(6);

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

    mutate(mutator) {
      assert.ok(mutator instanceof IsDeleteItemLoadingMutator, 'The RemoveItemAction should provide instances of the ' +
        'IsDeleteItemLoadingMutator to the state manager.');
      assert.step(mutator.constructor.name + ': ' + mutator._isLoading);
    },
  };

  const apiServiceMock = {
    deleteFolder(folderId) {
      return new Promise((resolve) => {
        assert.strictEqual(folderId, id, 'The RemoveItemAction should provide the correct folder id to the ' +
          'API Service.');
        resolve();
      });
    },
  };

  const action = new RemoveItemAction(folder);
  action.apply(stateManagerMock, apiServiceMock);

  assert.verifySteps([
    'IsDeleteItemLoadingMutator: true',
    'IsDeleteItemLoadingMutator: false',
  ], 'The RemoveItemAction should provide correct mutators to the state manager.');
});

test('should remove files correctly.', (assert) => {
  assert.expect(6);

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

    mutate(mutator) {
      assert.ok(mutator instanceof IsDeleteItemLoadingMutator, 'The RemoveItemAction should provide instances of the ' +
        'IsDeleteItemLoadingMutator to the state manager.');
      assert.step(mutator.constructor.name + ': ' + mutator._isLoading);
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
  action.apply(stateManagerMock, apiServiceMock);

  assert.verifySteps([
    'IsDeleteItemLoadingMutator: true',
    'IsDeleteItemLoadingMutator: false',
  ], 'The RemoveItemAction should provide correct mutators to the state manager.');
});
