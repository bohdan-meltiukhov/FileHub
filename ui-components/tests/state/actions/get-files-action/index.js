import FileListMutator from '../../../../app/state/mutators/file-list-mutator';
import GetFilesAction from '../../../../app/state/actions/get-files-action';

const {module, test} = QUnit;

module('The GetFilesAction test');

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

  const apiService = {
    getFiles: () => files,
  };

  const stateManager = {
    state: {},
    mutate: (mutator) => {
      assert.step('The mutate() method called.');
      if (mutator instanceof FileListMutator) {
        const state = {};
        mutator.apply(state);
        assert.strictEqual(state.fileList, files, 'The GetFilesAction should provide the correct files.');
      }
    },
  };

  const action = new GetFilesAction();
  action.apply(stateManager, apiService);

  assert.timeout(1000);
  const done = assert.async();
  setTimeout(() => {
    assert.verifySteps(['The mutate() method called.', 'The mutate() method called.', 'The mutate() method called.']);
    done();
  }, 500);
});
