import FileListMutator from '../../../../app/state/mutators/file-list-mutator';
import GetFilesAction from '../../../../app/state/actions/get-files-action';
import IsFileListLoadingMutator from '../../../../app/state/mutators/is-file-list-loading-mutator';

const {module, test} = QUnit;

module('The GetFilesAction');

test('should call the mutate method of the state manager.', async (assert) => {
  assert.expect(7);

  const files = [
    {
      name: 'Documents',
      itemsNumber: 20,
      type: 'folder',
    },
    {
      name: 'photo.png',
      mimeType: 'image',
      size: 16,
      type: 'file',
    },
  ];

  const getFiles = async () => {
    return files;
  };

  const apiServiceMock = {
    getFiles,
  };

  const stateManagerMock = {
    mutate: (mutator) => {
      assert.step(mutator.constructor.name);
      if (mutator instanceof IsFileListLoadingMutator) {
        assert.step('IsFileListLoadingMutator: ' + mutator._isLoading);
      } else if (mutator instanceof FileListMutator) {
        assert.strictEqual(mutator._fileList, files, 'The GetFilesAction should create an instance of the ' +
          'FileListMutator with correct files.');
      }
    },
  };

  const action = new GetFilesAction();
  action.apply(stateManagerMock, apiServiceMock);

  await getFiles();
  assert.verifySteps([
    'IsFileListLoadingMutator',
    'IsFileListLoadingMutator: true',
    'FileListMutator',
    'IsFileListLoadingMutator',
    'IsFileListLoadingMutator: false',
  ], 'The GetFilesAction should provided mutators to the state manager in the correct order.');
});
