import InnerBreadcrumbs from '../../../app/components/inner-breadcrumbs';

const {module, test} = QUnit;

let fixture;

module('The InnerBreadcrumbs test', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
  },
});

test('should have the default folder name.', (assert) => {
  new InnerBreadcrumbs(fixture);
  const breadcrumbs = fixture.firstElementChild;

  assert.strictEqual(breadcrumbs.innerText, '/ Folder', 'The inner breadcrumbs should have the default folder name.');
});

test('should display the provided folder name.', (assert) => {
  const folder = 'Documents';
  new InnerBreadcrumbs(fixture, {folder});
  const breadcrumbs = fixture.firstElementChild;

  assert.strictEqual(breadcrumbs.innerText, `/ ${folder}`, 'The inner breadcrumbs should display the provided ' +
    'folder name.');
});
