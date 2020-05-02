import Breadcrumbs from '../../../app/components/breadcrumbs';

const {module, test} = QUnit;

let fixture;

module('The Breadcrumbs', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
  },
});

test('should display the provided folder name.', (assert) => {
  const folderName = 'Documents';
  new Breadcrumbs(fixture, {folderName});
  const breadcrumbsElement = fixture.firstElementChild;

  assert.strictEqual(breadcrumbsElement.innerText, `/ ${folderName}`, 'The inner breadcrumbs should display ' +
    'the provided folder name.');
});

test('should set the folder.', (assert) => {
  assert.expect(3);

  const rootFolderName = 'Root';

  const rootFolder = {
    id: 'id',
    parentId: 'none',
    name: rootFolderName,
    itemsNumber: 20,
    type: 'folder',
  };

  const breadcrumbs = new Breadcrumbs(fixture);
  const breadcrumbsElement = fixture.firstElementChild;

  breadcrumbs.folder = rootFolder;
  breadcrumbs.isLoading = false;

  let folderIcon = breadcrumbsElement.querySelector('[data-test="folder-icon"] .glyphicon');

  assert.ok(folderIcon.classList.contains('glyphicon-folder-open'), 'The breadcrumbs should show the folder-open ' +
    'icon when the folder has no parent.');

  assert.strictEqual(breadcrumbsElement.innerText, `/ ${rootFolderName}`, 'The breadcrumbs should set the folder ' +
    'name.');

  breadcrumbs.folder = {
    id: 'id',
    parentId: 'parent',
    name: 'Shared',
    itemsNumber: 30,
    type: 'folder',
  };

  folderIcon = breadcrumbsElement.querySelector('[data-test="folder-icon"] .glyphicon');

  assert.ok(folderIcon.classList.contains('glyphicon-level-up'), 'The breadcrumbs should show the level-up ' +
    'icon when the folder has a parent.');
});
