import fetchMock from '../../../node_modules/fetch-mock/esm/client.js';

const folders = [
  {
    id: '4Goz0J0Tz8xfDfsJ',
    folderInfo: {
      name: 'Root',
      itemsNumber: 20,
      type: 'folder',
    },
    content: [
      {
        name: 'Documents',
        itemsNumber: 2,
        type: 'folder',
      },
      {
        name: 'Images',
        itemsNumber: 2,
        type: 'folder',
      },
    ],
  },
  {
    id: 'uExvhDL4YwkxnBVa',
    folderInfo: {
      name: 'Documents',
      itemsNumber: 20,
      type: 'folder',
    },
    content: [
      {
        name: 'Shared with me',
        itemsNumber: 202,
        type: 'folder',
      },
      {
        name: 'photo.png',
        mimeType: 'image',
        size: 16,
        type: 'file',
      },
    ],
  },
  {
    id: 'tRZXiSHNRlgZluGQ',
    folderInfo: {
      name: 'Images',
      itemsNumber: 20,
      type: 'folder',
    },
    content: [
      {
        name: 'Montenegro.jpg',
        mimeType: 'image',
        size: 162,
        type: 'file',
      },
      {
        name: 'my_friends.png',
        mimeType: 'image',
        size: 16,
        type: 'file',
      },
    ],
  },
];

/**
 * The class for setting the fetch mock.
 */
export default class FetchMock {
  /**
   * Sets mocks for different fetch requests.
   */
  static setMock() {
    FetchMock._setLogin();
    FetchMock._setRegister();
    FetchMock._setFiles();
    FetchMock._setFolder();
  }

  /**
   * Sets a mock for the login request.
   *
   * @private
   */
  static _setLogin() {
    fetchMock.post('/login', (url, options) => {
      const credentials = options.body;
      if (credentials.username === 'admin' && credentials.password === '1234') {
        return {token: 'my-token'};
      }
      return 401;
    });
  }

  /**
   * Sets a mock for the register request.
   *
   * @private
   */
  static _setRegister() {
    fetchMock.post('/register', (url, options) => {
      const credentials = options.body;
      if (credentials.username === 'admin') {
        return {
          status: 422,
          body: {
            errors: [
              {
                field: 'username',
                message: 'The username is already taken.',
              },
            ],
          },
        };
      } else {
        return 200;
      }
    });
  }

  /**
   * Sets a mock for the files request.
   *
   * @private
   */
  static _setFiles() {
    fetchMock.get('glob:/folder/*/content', (url) => {
      const id = url.slice(8, url.indexOf('/content'));

      const folder = folders.find((folder) => {
        if (folder.id === id) {
          return true;
        }
      });

      if (!folder) {
        return 404;
      }

      return {
        body: {
          files: folder.content,
        },
      };
    }, {
      delay: 500,
    });
  }

  /**
   * Sets a mock for the folder request.
   *
   * @private
   */
  static _setFolder() {
    fetchMock.get('glob:/folder/*', (url) => {
      const id = url.slice(8);

      const folder = folders.find((folder) => {
        if (folder.id === id) {
          return true;
        }
      });

      if (!folder) {
        return 404;
      }

      return {
        body: {
          folder: folder.folderInfo,
        },
      };
    });
  }
}
