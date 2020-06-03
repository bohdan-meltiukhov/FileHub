import LocationMutator from '../../../../app/state/mutators/location-mutator';

const {module, test} = QUnit;

export default module('The LocationMutator', () => {
  test('should set location to state correctly.', (assert) => {
    const location = '/file-list';

    const mutator = new LocationMutator(location);

    const state = {};

    mutator.apply(state);

    assert.strictEqual(state.location, location, 'The LocationMutator should set the location to the provided state ' +
      'correctly.');
  });
});
