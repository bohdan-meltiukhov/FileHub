import UserNameMutator from '../../../../app/state/mutators/user-name-mutator';
import GetUserAction from '../../../../app/state/actions/get-user-action';

const {module, test} = QUnit;

module('The GetUserAction');

test('should get the current user.', async (assert) => {
  assert.expect(2);

  const user = {
    name: 'John',
  };

  const getUser = () => {
    return new Promise((resolve) => {
      resolve(user);
    });
  };

  const apiServiceMock = {
    getUser,
  };

  const stateManagerMock = {
    mutate: (mutator) => {
      assert.ok(mutator instanceof UserNameMutator, 'The GetUserAction should provide an instance of the ' +
        'UserNameMutator to the state manager.');
      assert.strictEqual(mutator._name, user.name, 'The GetUserAction should provide correct user name to the ' +
        'UserNameMutator.');
    },
  };

  const action = new GetUserAction();
  action.apply(stateManagerMock, apiServiceMock);
});
