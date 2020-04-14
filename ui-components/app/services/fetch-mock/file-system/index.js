/**
 * The class for storing files and folders for the fetch-mock.
 */
export default class FileSystem {
  /**
   * The object for describing the file configurations.
   *
   * @typedef {object} FileItem
   * @property {string} id - The identifier of the file.
   * @property {string} parentId - The id of the parent folder.
   * @property {string} name - The name of the file.
   * @property {('image'|'book'|'video'|'audio'|'stylesheet'|'other')} mimeType - The type of the file.
   * @property {number} size - The size of the file in bytes.
   * @property {'file'} type - Shows that this item is a file.
   */

  /**
   * An array of files.
   *
   * @type {FileItem[]}
   */
  static files = [
    {
      id: 'rYol3zzsCYc561cV',
      parentId: 'uExvhDL4YwkxnBVa',
      name: 'Document.pdf',
      mimeType: 'book',
      size: 202,
      type: 'file',
    },
    {
      id: '1csJkySJRhAbMLKG',
      parentId: 'uExvhDL4YwkxnBVa',
      name: 'photo.png',
      mimeType: 'image',
      size: 16,
      type: 'file',
    },
    {
      id: 'ARqTPQ1XXUrFlaJe',
      parentId: 'tRZXiSHNRlgZluGQ',
      name: 'Montenegro.jpg',
      mimeType: 'image',
      size: 162,
      type: 'file',
    },
    {
      id: 'zHPz1GsbO9Kq8Xt0',
      parentId: 'tRZXiSHNRlgZluGQ',
      name: 'my_friends.png',
      mimeType: 'image',
      size: 16,
      type: 'file',
    },
  ];

  /**
   * The object for describing the folder configurations.
   *
   * @typedef {object} FolderItem
   * @property {string} id - The identifier of the folder.
   * @property {string} parentId - The id of the parent folder.
   * @property {string} name - The name of the folder.
   * @property {number} itemsNumber - The number of items inside.
   * @property {'folder'} type - Shows that this item is a folder.
   */

  /**
   * An array of folders.
   *
   * @type {FolderItem[]}
   */
  static folders = [
    {
      id: '4Goz0J0Tz8xfDfsJ',
      parentId: 'none',
      name: 'Root',
      itemsNumber: 20,
      type: 'folder',
    },
    {
      id: 'uExvhDL4YwkxnBVa',
      parentId: '4Goz0J0Tz8xfDfsJ',
      name: 'Documents',
      itemsNumber: 20,
      type: 'folder',
    },
    {
      id: 'tRZXiSHNRlgZluGQ',
      parentId: '4Goz0J0Tz8xfDfsJ',
      name: 'Images',
      itemsNumber: 20,
      type: 'folder',
    },
  ];
}
