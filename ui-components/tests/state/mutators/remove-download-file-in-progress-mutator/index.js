import RemoveDownloadFileInProgressMutator
  from '../../../../app/state/mutators/remove-download-file-in-progress-mutator';

const {module, test} = QUnit;

module('The RemoveDownloadFileInProgressMutator');

test('should add the provided file ID to the state.', (assert) => {
  const fileId = 'zHPz1GsbO9Kq8Xt0';
  const state = {
    filesWithDownloadInProgress: new Set([fileId]),
  };

  const mutator = new RemoveDownloadFileInProgressMutator(fileId);
  mutator.apply(state);

  assert.deepEqual(Array.from(state.filesWithDownloadInProgress), [], 'The RemoveDownloadFileInProgressMutator ' +
    'should remove the file ID from the filesWithDownloadInProgress state field.');
});
