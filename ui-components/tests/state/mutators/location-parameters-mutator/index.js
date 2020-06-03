import LocationParametersMutator from '../../../../app/state/mutators/location-parameters-mutator';

const {module, test} = QUnit;

export default module('The LocationParametersMutator', () => {
  test('should set location parameters to state correctly.', (assert) => {
    const parameters = {
      folderId: 'root',
    };

    const mutator = new LocationParametersMutator(parameters);

    const state = {};

    mutator.apply(state);

    assert.strictEqual(state.locationParameters, parameters, 'The LocationParametersMutator should set the location ' +
      'parameters to the provided state correctly.');
  });
});
