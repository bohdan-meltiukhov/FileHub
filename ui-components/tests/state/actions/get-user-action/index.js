import UserNameMutator from '../../../../app/state/mutators/user-name-mutator';
import GetUserAction from '../../../../app/state/actions/get-user-action';
import IsUserNameLoadingMutator from '../../../../app/state/mutators/is-user-name-loading-mutator';

const {module, test} = QUnit;

export default module('The GetUserAction', () => {
  test('should get the current user.', async (assert) => {
    assert.expect(8);

    const user = {
      name: 'John',
    };

    const getUser = () => {
      return new Promise((resolve) => {
        assert.ok(true, 'The GetUserAction should call the ApiService.getUser() method.');
        resolve(user);
      });
    };

    const apiServiceMock = {
      getUser,
    };

    const stateManagerMock = {
      mutate: (mutator) => {
        assert.step(mutator.constructor.name);
        if (mutator instanceof IsUserNameLoadingMutator) {
          assert.step(`IsLoading: ${mutator._isLoading}.`);
        } else if (mutator instanceof UserNameMutator) {
          assert.strictEqual(mutator._name, user.name, 'The GetUserAction should provide correct user name to the ' +
            'UserNameMutator.');
        }
      },
    };

    const action = new GetUserAction();
    await action.apply(stateManagerMock, apiServiceMock);

    assert.verifySteps([
      'IsUserNameLoadingMutator',
      'IsLoading: true.',
      'UserNameMutator',
      'IsUserNameLoadingMutator',
      'IsLoading: false.',
    ], 'The GetUserAction should provide mutators to the state manager in the correct order.');
  });
});
