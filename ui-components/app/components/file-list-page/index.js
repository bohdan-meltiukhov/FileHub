import UserDetails from '../user-details';
import Breadcrumbs from '../breadcrumbs';
import Button from '../button';
import FileList from '../file-list';
import StateManager from '../../state/state-manager';
import StateAwareComponent from '../../state-aware-component';
import GetFilesAction from '../../state/actions/get-files-action';
import {AUTHENTICATION_ROUTE, FILE_LIST_ROUTE} from '../../router/routes';
import UploadFileAction from '../../state/actions/upload-file-action';
import GetFolderAction from '../../state/actions/get-folder-action';
import UrlProperties from '../../models/url-properties';
import {ROOT_FOLDER_ID} from '../../models/root-folder';
import NotFoundError from '../../models/errors/not-found-error';

/**
 * The component for the File List Page.
 */
export default class FileListPage extends StateAwareComponent {
  /**
   * Creates an instance of the File List page with set container.
   *
   * @param {Element} container - The parent element for the page.
   * @param {StateManager} stateManager - The state manager to use.
   * @param {UrlProperties} properties - The URL properties.
   */
  constructor(container, stateManager, properties) {
    super(container, stateManager);

    this.render();
    stateManager.dispatch(new GetFolderAction(properties.folderId));
    stateManager.dispatch(new GetFilesAction(properties.folderId));
  }

  /**
   * @inheritdoc
   */
  markup() {
    const rootFolderPath = FILE_LIST_ROUTE.replace(':folderId', ROOT_FOLDER_ID);
    return `
        <div class="application-box" data-test="file-list-page">
            <img src="app/images/logo.png" class="logo" alt="logo">
    
            <ul class="menu">
                <li><span data-test="user-details"></li>
                <li>
                    <a href="#${AUTHENTICATION_ROUTE}">Log Out <span class="glyphicon glyphicon-log-out"></span></a>
                </li>
            </ul>
            
            <header class="header">
                <a href="#${rootFolderPath}"><h1>File Explorer</h1></a>
            </header>
            
            <main class="file-list">
                <div class="current-directory">
                    <div data-test="breadcrumbs"></div>
                    <div class="function-buttons">
                        <span data-test="create-folder-button"></span>
                        <span data-test="upload-file-button"></span>
                    </div>
                </div>
                
                <div data-test="file-list"></div>
                <div class="loader" data-test="loader"></div>
                <div class="not-found-message" data-test="not-found-message">
                    <p>Unfortunately, we didn't manage to find this folder.</p>
                    <a href="#${rootFolderPath}" title="Go to the root folder">Go to the root folder</atitle>
                </div>
            </main>
        </div>
    `;
  }

  /** @inheritdoc */
  initNestedComponents() {
    const userDetailsContainer = this.rootElement.querySelector('[data-test="user-details"]');
    this.userDetails = new UserDetails(userDetailsContainer, {
      username: 'John Doe',
    });

    const breadcrumbsContainer = this.rootElement.querySelector('[data-test="breadcrumbs"]');
    this.breadcrumbs = new Breadcrumbs(breadcrumbsContainer);

    const createFolderButtonContainer = this.rootElement.querySelector('[data-test="create-folder-button"]');
    this.createFolderButton = new Button(createFolderButtonContainer, {
      buttonText: '<span class="glyphicon glyphicon-plus"></span> Create folder',
    });

    const uploadFileButtonContainer = this.rootElement.querySelector('[data-test="upload-file-button"]');
    this.uploadFileButton = new Button(uploadFileButtonContainer, {
      buttonText: '<span class="glyphicon glyphicon-upload"></span> Upload file',
    });

    this.fileListContainer = this.rootElement.querySelector('[data-test="file-list"]');
    this.fileList = new FileList(this.fileListContainer);

    this._notFoundMessage = this.rootElement.querySelector('[data-test="not-found-message"]');
    this._notFoundMessage.style.display = 'none';
  }

  /** @inheritdoc */
  addEventListeners() {
    this.fileList.onFileSelected((folder, file) => {
      this.stateManager.dispatch(new UploadFileAction(folder, file));
    });

    this.uploadFileButton.addClickHandler(() => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();

      input.addEventListener('change', async () => {
        await this.stateManager.dispatch(new UploadFileAction(this._folder, input.files[0]));
        this.stateManager.dispatch(new GetFilesAction(this._folder.id));
      });
    });
  }

  /** @inheritdoc */
  initState() {
    this.onStateChanged('fileList', ({detail: {state}}) => {
      this.fileList.files = state.fileList;

      this.fileList.onFileSelected((folder, file) => {
        this.stateManager.dispatch(new UploadFileAction(folder, file));
      });
    });

    this.onStateChanged('isFileListLoading', ({detail: {state}}) => {
      const loader = this.rootElement.querySelector('[data-test="loader"]');
      if (state.isFileListLoading) {
        this.fileList.display = false;
        loader.style.display = 'block';
        this._notFoundMessage.style.display = 'none';
      } else {
        loader.style.display = 'none';
        this.fileList.display = true;
      }
    });

    this.onStateChanged('locationParameters', ({detail: {state}}) => {
      if (state.locationParameters.folderId) {
        this.stateManager.dispatch(new GetFolderAction(state.locationParameters.folderId));
        this.stateManager.dispatch(new GetFilesAction(state.locationParameters.folderId));
      }
    });

    this.onStateChanged('isFolderLoading', ({detail: {state}}) => {
      this.breadcrumbs.isLoading = state.isFolderLoading;
    });

    this.onStateChanged('folder', ({detail: {state}}) => {
      this._folder = state.folder;
      this.breadcrumbs.folder = state.folder;
    });

    this.onStateChanged('fileListLoadingError', ({detail: {state}}) => {
      const error = state.fileListLoadingError;
      if (error instanceof NotFoundError) {
        this.fileList.files = [];
        this._notFoundMessage.style.display = 'block';
      }
    });

    this.onStateChanged('folderLoadingError', ({detail: {state}}) => {
      const error = state.folderLoadingError;
      if (error instanceof NotFoundError) {
        this.breadcrumbs.error = 'Not Found';
      }
    });
  }

  /** @inheritdoc */
  willDestroy() {
    this.removeStateChangedListeners();
  }
}
