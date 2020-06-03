import HashChangedAction from '../../../../app/state/actions/hash-changed-action';
import LocationMutator from '../../../../app/state/mutators/location-mutator';
import LocationParametersMutator from '../../../../app/state/mutators/location-parameters-mutator';

const {module, test} = QUnit;

export default module('The HashChangedAction', () => {
  test('should provide correct mutators to the state manager.', (assert) => {
    assert.expect(5);

    const staticPart = '/file-list';
    const dynamicPart = {
      folderId: 'root',
    };

    const stateManagerMock = {
      mutate: (mutator) => {
        assert.step(mutator.constructor.name);
        if (mutator instanceof LocationMutator) {
          assert.strictEqual(mutator._location, staticPart, 'The HashChangedAction should provide correct location ' +
            'to the state manager.');
        } else if (mutator instanceof LocationParametersMutator) {
          assert.strictEqual(mutator._parameters, dynamicPart, 'The HashChangedAction should provide correct ' +
            'location parameters to the state manager.');
        }
      },
    };

    const action = new HashChangedAction(staticPart, dynamicPart);
    action.apply(stateManagerMock, {});

    assert.verifySteps([
      'LocationMutator',
      'LocationParametersMutator',
    ], 'The HashChangedAction should provide correct mutators to the state manager.');
  });
});
