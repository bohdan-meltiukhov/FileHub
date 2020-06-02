import UserDetails from '../user-details';
import Breadcrumbs from '../breadcrumbs';
import Button from '../button';
import FileList from '../file-list';
import StateManager from '../../state/state-manager';
import StateAwareComponent from '../../state-aware-component';
import GetFilesAction from '../../state/actions/get-files-action';
import DownloadFileAction from '../../state/actions/download-file-action';
import {AUTHENTICATION_ROUTE, FILE_LIST_ROUTE} from '../../router/routes';
import LogOutAction from '../../state/actions/log-out-action';
import UpdateItemAction from '../../state/actions/update-item-action';
import RemoveItemAction from '../../state/actions/remove-item-action';
import UploadFileAction from '../../state/actions/upload-file-action';
import GetFolderAction from '../../state/actions/get-folder-action';
import CreateFolderAction from '../../state/actions/create-folder-action';
import UrlProperties from '../../models/url-properties';
import {ROOT_FOLDER_ID} from '../../models/root-folder';
import NotFoundError from '../../models/errors/not-found-error';
import AuthorizationError from '../../models/errors/authorization-error';
import GeneralServerError from '../../models/errors/general-server-error';
import GetUserAction from '../../state/actions/get-user-action';
import DownloadFileService from '../../services/download-file-service';

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
    stateManager.dispatch(new GetUserAction());
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
                    <a href="#${AUTHENTICATION_ROUTE}" data-test="log-out">
                        Log Out <span class="glyphicon glyphicon-log-out"></span>
                    </a>
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
    this.userDetails = new UserDetails(userDetailsContainer);

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
    this.fileList.onRemoveButtonClicked((item) => {
      this.stateManager.dispatch(new RemoveItemAction(item));
    });

    this.fileList.onFileUploadInitiated((folderId, file) => {
      this.stateManager.dispatch(new UploadFileAction(folderId, file));
    });

    this.fileList.onItemNameChanged((item) => {
      this.stateManager.dispatch(new UpdateItemAction(item));
    });

    this.uploadFileButton.addClickHandler(() => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();

      const folderId = this.stateManager.state.locationParameters.folderId;

      input.addEventListener('change', () => {
        this.stateManager.dispatch(new UploadFileAction(folderId, input.files[0]));
      });
    });

    this.createFolderButton.addClickHandler(() => {
      const folderId = this.stateManager.state.locationParameters.folderId;
      this.stateManager.dispatch(new CreateFolderAction(folderId));
    });

    const logOutLink = this.rootElement.querySelector('[data-test="log-out"]');
    logOutLink.addEventListener('click', () => {
      this.stateManager.dispatch(new LogOutAction());
    });

    this.fileList.onDownloadButtonPressed((file) => {
      const downloadFileService = new DownloadFileService();
      this.stateManager.dispatch(new DownloadFileAction(file, downloadFileService));
    });
  }

  /** @inheritdoc */
  initState() {
    this.onStateChanged('fileList', ({detail: {state}}) => {
      this.fileList.files = state.fileList;
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
      this.breadcrumbs.folder = state.folder;

      const foldersWithFileUploadInProgress = state.foldersWithFileUploadInProgress || new Set();
      this._toggleButtonLoading(this.uploadFileButton, foldersWithFileUploadInProgress);

      const foldersWithCreateFolderInProgress = state.foldersWithCreateFolderInProgress || new Set();
      this._toggleButtonLoading(this.createFolderButton, foldersWithCreateFolderInProgress);
    });

    this.onStateChanged('renameFolderId', ({detail: {state}}) => {
      this.fileList.renameFolder(state.renameFolderId);
    });

    this.onStateChanged('fileListLoadingError', ({detail: {state}}) => {
      const error = state.fileListLoadingError;
      if (error instanceof NotFoundError) {
        this.fileList.files = [];
        this._notFoundMessage.style.display = 'block';
      } else {
        this._handleError(error);
      }
    });

    this.onStateChanged('folderLoadingError', ({detail: {state}}) => {
      const error = state.folderLoadingError;
      if (error instanceof NotFoundError) {
        this.breadcrumbs.error = 'Not Found';
      } else {
        this._handleError(error);
      }
    });

    this.onStateChanged('itemsWithRenameInProgress', ({detail: {state}}) => {
      this.fileList.itemsWithRenameInProgress = Array.from(state.itemsWithRenameInProgress);
    });

    this.onStateChanged('renameItemLoadingError', ({detail: {state}}) => {
      this._handleError(state.renameItemLoadingError);
    });

    this.onStateChanged('deleteItemLoadingError', ({detail: {state}}) => {
      this._handleError(state.deleteItemLoadingError);
    });

    this.onStateChanged('itemsWithDeletionInProgress', ({detail: {state}}) => {
      this.fileList.itemsWithDeletionInProgress = state.itemsWithDeletionInProgress;
    });

    this.onStateChanged('foldersWithFileUploadInProgress', ({detail: {state}}) => {
      const loadingFolders = state.foldersWithFileUploadInProgress;

      this._toggleButtonLoading(this.uploadFileButton, loadingFolders);
      this.fileList.foldersWithFileUploadInProgress = loadingFolders;
    });

    this.onStateChanged('uploadFileError', ({detail: {state}}) => {
      this._handleError(state.uploadFileError);
    });

    this.onStateChanged('foldersWithCreateFolderInProgress', ({detail: {state}}) => {
      this._toggleButtonLoading(this.createFolderButton, state.foldersWithCreateFolderInProgress);
    });

    this.onStateChanged('createFolderError', ({detail: {state}}) => {
      this._handleError(state.createFolderError);
    });

    this.onStateChanged('username', ({detail: {state}}) => {
      this.userDetails.username = state.username;
    });

    this.onStateChanged('isUserNameLoading', ({detail: {state}}) => {
      this.userDetails.isLoading = state.isUserNameLoading;
    });

    this.onStateChanged('userNameLoadingError', ({detail: {state}}) => {
      const error = state.userNameLoadingError;

      if (error instanceof AuthorizationError) {
        alert('Error: ' + error.message);
        window.location.hash = AUTHENTICATION_ROUTE;
      } else {
        console.error('User Details Loading Error:', error);
      }
    });

    this.onStateChanged('downloadFileError', ({detail: {state}}) => {
      const {fileItem, error} = state.downloadFileError;
      if (error instanceof NotFoundError && fileItem.parentId !== state.locationParameters.folderId) {
        alert('Error: ' + error.message);
      } else {
        this._handleError(error);
      }
    });

    this.onStateChanged('filesWithDownloadInProgress', ({detail: {state}}) => {
      this.fileList.filesWithDownloadInProgress = state.filesWithDownloadInProgress;
    });
  }

  /**
   * Sets the isLoading state for the provided button if the current folder is present in the provided array of loading
   * items.
   *
   * @param {Button} button - The button that should be loading or not.
   * @param {Set} loadingItems - A Set of IDs of folders that are currently in a particular loading state.
   * @private
   */
  _toggleButtonLoading(button, loadingItems) {
    button.isLoading = loadingItems.has(this.stateManager.state.locationParameters.folderId);
  }

  /**
   * Handles the provided error.
   *
   * @param {NotFoundError|AuthorizationError|GeneralServerError|Error} error - The error that occurred during some
   * process.
   * @private
   */
  _handleError(error) {
    if (error instanceof NotFoundError) {
      alert('Error: ' + error.message);
      const folderId = this.stateManager.state.locationParameters.folderId;
      this.stateManager.dispatch(new GetFilesAction(folderId));
    } else if (error instanceof AuthorizationError) {
      alert('Error: ' + error.message);
      window.location.hash = AUTHENTICATION_ROUTE;
    } else if (error instanceof GeneralServerError) {
      alert('Error: ' + error.message);
    } else {
      alert('Unknown error. See the console for more details.');
      console.error(error);
    }
  }

  /** @inheritdoc */
  willDestroy() {
    this.removeStateChangedListeners();
  }
}
