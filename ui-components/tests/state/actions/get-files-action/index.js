import FileListMutator from '../../../../app/state/mutators/file-list-mutator';
import GetFilesAction from '../../../../app/state/actions/get-files-action';
import IsFileListLoadingMutator from '../../../../app/state/mutators/is-file-list-loading-mutator';

const {module, test} = QUnit;

module('The GetFilesAction');

test('should call the mutate method of the state manager.', async (assert) => {
  assert.expect(3);

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

  let isFileListLoadingMutatorProvided = false;
  let fileListMutatorProvided = false;

  const stateManagerMock = {
    mutate: (mutator) => {
      if (mutator instanceof IsFileListLoadingMutator) {
        isFileListLoadingMutatorProvided = true;
      } else if (mutator instanceof FileListMutator) {
        fileListMutatorProvided = true;
        assert.strictEqual(mutator._fileList, files, 'The GetFilesAction should create an instance of the ' +
          'FileListMutator with correct files.');
      }
    },
  };

  const action = new GetFilesAction();
  action.apply(stateManagerMock, apiServiceMock);

  await getFiles();
  assert.ok(isFileListLoadingMutatorProvided, 'The GetFilesAction should provide the IsFileListLoadingMutator to ' +
    'the state manager.');
  assert.ok(fileListMutatorProvided, 'The GetFilesAction should provide the FileListMutator to the state manager.');
});
