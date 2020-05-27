import AddDownloadFileInProgressMutator from '../../../../app/state/mutators/add-download-file-in-progress-mutator';

const {module, test} = QUnit;

module('The AddDownloadFileInProgressMutator');

test('should add the provided file ID to the state.', (assert) => {
  const fileId = 'zHPz1GsbO9Kq8Xt0';
  const state = {};

  const mutator = new AddDownloadFileInProgressMutator(fileId);
  mutator.apply(state);

  assert.deepEqual(state.filesWithDownloadInProgress, [fileId], 'The AddDownloadFileInProgressMutator should add ' +
    'the file ID to the filesWithDownloadInProgress state field.');
});
