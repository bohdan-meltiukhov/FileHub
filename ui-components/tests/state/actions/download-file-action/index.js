import DownloadedFileMutator from '../../../../app/state/mutators/downloaded-file-mutator';
import DownloadFileAction from '../../../../app/state/actions/download-file-action';

const {module, test} = QUnit;

module('The DownloadFileAction');

test('should download the required file.', (assert) => {
  assert.expect(3);

  const fileId = '1csJkySJRhAbMLKG';

  const file = new Blob(['Hello, world!'], {type: 'text/plain'});

  const apiServiceMock = {
    getFile: (id) => {
      assert.strictEqual(id, fileId, 'The DownloadFileAction should provide correct fileId to the apiService.');

      return new Promise((resolve) => {
        resolve(file);
      });
    },
  };

  const stateManagerMock = {
    mutate: (mutator) => {
      assert.ok(mutator instanceof DownloadedFileMutator, 'The DownloadFileAction should provide an instance of the ' +
        'DownloadedFileMutator to the stateManager when the file is returned from the server.');
      assert.deepEqual(mutator._file, file, 'The DownloadFileAction should provide correct file to the ' +
        'DownloadedFileMutator.');
    },
  };

  const action = new DownloadFileAction(fileId);
  action.apply(stateManagerMock, apiServiceMock);
});
