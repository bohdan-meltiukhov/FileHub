import FileListMutator from '../../../../app/state/mutators/file-list-mutator';
import GetFilesAction from '../../../../app/state/actions/get-files-action';

const {module, test} = QUnit;

module('The GetFilesAction');

test('should mutate the stateManager.', (assert) => {
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

  const apiServiceMock = {
    getFiles: () => files,
  };

  const stateManagerMock = {
    mutate: (mutator) => {
      if (mutator instanceof FileListMutator) {
        assert.strictEqual(mutator._fileList, files, 'The GetFilesAction should create an instance of the ' +
          'FileListMutator with correct files.');
      }
    },
  };

  const action = new GetFilesAction();
  action.apply(stateManagerMock, apiServiceMock);
});
