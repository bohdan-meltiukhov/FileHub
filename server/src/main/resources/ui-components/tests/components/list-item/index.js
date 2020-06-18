import ListItem from '../../../app/components/list-item';
import FileItem from '../../../app/models/file-system-objects/file-item';

const {module, test} = QUnit;

let fixture;
let row;

export default module('The ListItem', (hooks) => {
  hooks.beforeEach(() => {
    fixture = document.getElementById('qunit-fixture');
    row = document.createElement('tr');
    fixture.appendChild(row);
  });

  test('should handle click.', (assert) => {
    assert.expect(2);

    const item = new ListItem(row, {});
    const itemElement = fixture.firstElementChild;

    item.onClick(() => {
      assert.step('The item is clicked.');
    });

    itemElement.click();
    assert.verifySteps(['The item is clicked.'],
      'The ListItem should call the onClick handler when the item is clicked.');
  });

  test('should handle the input change event.', (assert) => {
    const fileItem = new FileItem({
      id: 'rYol3zzsCYc561cV',
      parentId: 'uExvhDL4YwkxnBVa',
      name: 'Document.pdf',
      mimeType: 'book',
      size: 202,
      type: 'file',
    });

    const item = new ListItem(row, fileItem);
    const itemElement = fixture.firstElementChild;

    item.onNameChanged((parameters) => {
      assert.step('The name is changed.');
      assert.deepEqual(parameters, fileItem, 'The ListItem should provide correct parameters to the onNameChanged ' +
        'handler.');
    });

    const input = itemElement.querySelector('[data-test="new-name-input"]');
    input.value = 'Book.pdf';
    input.dispatchEvent(new Event('change'));

    assert.verifySteps(['The name is changed.'],
      'The ListItem should call the onNameChanged handler when the item name is changed.');
  });

  test('should handle the isSelected state.', (assert) => {
    assert.expect(2);

    const item = new ListItem(row, {});
    const itemElement = fixture.firstElementChild;

    item.isSelected = true;

    assert.ok(itemElement.classList.contains('selected'), 'The ListItem should add the \'selected\' class when the ' +
      'isSelected setter receives true value.');

    item.isSelected = false;

    assert.notOk(itemElement.classList.contains('selected'), 'The ListItem should remove the \'selected\' class when ' +
      'the isSelected setter receives false value.');
  });

  test('should handle the isEditing state.', (assert) => {
    assert.expect(2);

    const item = new ListItem(row, {});
    const itemElement = fixture.firstElementChild;

    item.isEditing = true;

    assert.ok(itemElement.classList.contains('editing'), 'The ListItem should add the \'editing\' class when the ' +
      'isEditing setter receives true value.');

    item.isEditing = false;

    assert.notOk(itemElement.classList.contains('editing'), 'The ListItem should remove the \'editing\' class when ' +
      'the isEditing setter receives false value.');
  });

  test('should call the onRemoveButtonClicked handler.', (assert) => {
    assert.expect(3);

    const fileItem = new FileItem({
      id: 'rYol3zzsCYc561cV',
      parentId: 'uExvhDL4YwkxnBVa',
      name: 'Document.pdf',
      mimeType: 'book',
      size: 202,
      type: 'file',
    });

    const item = new ListItem(row, fileItem);
    const itemElement = fixture.firstElementChild;

    const handler = (parameters) => {
      assert.step('The removeButtonClicked handler is called.');
      assert.deepEqual(parameters, fileItem, 'The ListItem should provide correct parameters to the ' +
        'removeButtonClicked handler.');
    };

    item.onRemoveButtonClicked(handler);

    const icon = itemElement.querySelector('[data-test="remove-item-button"]');
    icon.click();

    assert.verifySteps(['The removeButtonClicked handler is called.'], 'The ListItem should call the ' +
      'removeButtonClicked handler when the button is clicked.');
  });
});
