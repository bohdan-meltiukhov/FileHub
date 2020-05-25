import LogOutAction from '../../../../app/state/actions/log-out-action';

const {module, test} = QUnit;

module('The LogOutAction');

test('should log the current user out.', (assert) => {
  assert.expect(2);

  const apiServiceMock = {
    logOut: () => {
      assert.step('The user is logged out.');
    },
  };

  const action = new LogOutAction();
  action.apply({}, apiServiceMock);

  assert.verifySteps(['The user is logged out.'], 'The LogOutAction should call the logOut() method of the ' +
    'apiService.');
});
