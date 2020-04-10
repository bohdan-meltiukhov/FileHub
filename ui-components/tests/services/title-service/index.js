import TitleService from '../../../app/services/title-service';

const {module, test} = QUnit;

module('The TitleService test');

test('should set the page title.', (assert) => {
  const documentMock = {
    title: '',
  };

  const titleService = new TitleService(documentMock);
  const title = 'Profile';
  titleService.setTitle(title);
  assert.strictEqual(documentMock.title, `${title} - File Hub`, 'The title service should set the page title.');
});
