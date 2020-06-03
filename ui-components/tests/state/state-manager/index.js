import StateManager from '../../../app/state/state-manager';
import ApiService from '../../../app/services/api-service';

const {module, test} = QUnit;

export default module('The StateManager', () => {
  test('should handle the state change.', (assert) => {
    const state = {};
    const stateManager = new StateManager(state, ApiService.getInstance());

    const field = 'field';
    stateManager.onStateChanged(field, () => {
      assert.step('State changed.');
    });

    stateManager.state[field] = 'Some value.';

    assert.verifySteps(['State changed.'], 'The State Manager should call the onStateChanged function when the state ' +
      'changes.');
  });

  test('should dispatch the provided action.', (assert) => {
    const stateManager = new StateManager({}, ApiService.getInstance());
    const actionMock = {
      apply: function() {
        assert.step('Action applied.');
      },
    };

    stateManager.dispatch(actionMock);

    assert.verifySteps(['Action applied.'], 'The State Manager should dispatch the provided action');
  });

  test('should mutate the state.', (assert) => {
    const stateManager = new StateManager({}, ApiService.getInstance());
    const mutatorMock = {
      apply: function() {
        assert.step('Mutator applied');
      },
    };

    stateManager.mutate(mutatorMock);

    assert.verifySteps(['Mutator applied'], 'The State Manager should apply the mutator provided to the mutate ' +
      'method.');
  });
});
