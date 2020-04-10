import RootBreadcrumbs from '../../../app/components/root-breadcrumbs';

const {module, test} = QUnit;

let fixture;

module('The RootBreadcrumbs test', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
  },
});

test('should have the default folder name.', (assert) => {
  new RootBreadcrumbs(fixture);
  const breadcrumbs = fixture.firstElementChild;

  assert.strictEqual(breadcrumbs.innerText, '/ Root', 'The root breadcrumbs should have the default folder name.');
});

test('should display the provided folder name.', (assert) => {
  const folder = 'Documents';
  new RootBreadcrumbs(fixture, {folder});
  const breadcrumbs = fixture.firstElementChild;

  assert.strictEqual(breadcrumbs.innerText, `/ ${folder}`, 'The root breadcrumbs should display the provided ' +
    'folder name.');
});
