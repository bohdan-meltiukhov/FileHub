import DeleteItemLoadingErrorMutator from '../../../../app/state/mutators/delete-item-loading-error-mutator';

const {module, test} = QUnit;

export default module('The DeleteItemLoadingErrorMutator', () => {
  test('should set the error correctly.', (assert) => {
    const error = new Error('Something went wrong');

    const mutator = new DeleteItemLoadingErrorMutator(error);

    const state = {};

    mutator.apply(state);

    assert.strictEqual(state.deleteItemLoadingError, error, 'The DeleteItemLoadingError should set the error to the ' +
      'provided state correctly.');
  });
});
