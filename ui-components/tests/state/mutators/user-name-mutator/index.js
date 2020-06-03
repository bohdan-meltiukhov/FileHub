import UserNameMutator from '../../../../app/state/mutators/user-name-mutator';

const {module, test} = QUnit;

export default module('The UserNameMutator', () => {
  test('should set the user name correctly.', (assert) => {
    const userName = 'Robert';

    const mutator = new UserNameMutator(userName);

    const state = {};

    mutator.apply(state);

    assert.strictEqual(state.username, userName, 'The UserNameMutator should set the user name to the provided state ' +
      'correctly.');
  });
});
