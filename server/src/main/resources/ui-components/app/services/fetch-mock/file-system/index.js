import FileItem from '../../../models/file-system-objects/file-item/index.js';
import FolderItem from '../../../models/file-system-objects/folder-item/index.js';

/**
 * The class for storing files and folders for the fetch-mock.
 */
export default class FileSystem {
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
