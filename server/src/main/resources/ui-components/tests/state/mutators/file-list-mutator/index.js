import FileListMutator from '../../../../app/state/mutators/file-list-mutator';

const {module, test} = QUnit;

export default module('The FileListMutator', () => {
  test('should apply the file list.', (assert) => {
    const fileList = [
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

    const mutator = new FileListMutator(fileList);
    const state = {};

    mutator.apply(state);

    assert.strictEqual(state.fileList, fileList, 'The file list mutator should apply the file list to the provided ' +
      'state.');
  });
});
