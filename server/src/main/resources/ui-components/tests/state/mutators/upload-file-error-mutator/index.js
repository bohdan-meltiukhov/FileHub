import UploadFileErrorMutator from '../../../../app/state/mutators/upload-file-error-mutator';

const {module, test} = QUnit;

export default module('The UploadFileErrorMutator', () => {
  test('should set the provided loading error.', (assert) => {
    const error = new Error('Something went wrong');
    const state = {};

    const mutator = new UploadFileErrorMutator(error);
    mutator.apply(state);

    assert.strictEqual(state.uploadFileError, error, 'The UploadFileErrorMutator should set the error to the ' +
      'provided state correctly.');
  });
});
