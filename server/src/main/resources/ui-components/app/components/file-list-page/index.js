import UserDetails from '../user-details/index.js';
import Breadcrumbs from '../breadcrumbs/index.js';
import Button from '../button/index.js';
import FileList from '../file-list/index.js';
import StateManager from '../../state/state-manager/index.js';
import StateAwareComponent from '../../state-aware-component/index.js';
import GetFilesAction from '../../state/actions/get-files-action/index.js';
import DownloadFileAction from '../../state/actions/download-file-action/index.js';
import {AUTHENTICATION_ROUTE, FILE_LIST_ROUTE} from '../../router/routes/index.js';
import LogOutAction from '../../state/actions/log-out-action/index.js';
import UpdateItemAction from '../../state/actions/update-item-action/index.js';
import RemoveItemAction from '../../state/actions/remove-item-action/index.js';
import UploadFileAction from '../../state/actions/upload-file-action/index.js';
import GetFolderAction from '../../state/actions/get-folder-action/index.js';
import CreateFolderAction from '../../state/actions/create-folder-action/index.js';
import UrlProperties from '../../models/url-properties/index.js';
import NotFoundError from '../../models/errors/not-found-error/index.js';
import AuthorizationError from '../../models/errors/authorization-error/index.js';
import GeneralServerError from '../../models/errors/general-server-error/index.js';
import GetUserAction from '../../state/actions/get-user-action/index.js';
import DownloadFileService from '../../services/download-file-service/index.js';
import MessageService from '../../services/message-service/index.js';
import GetRootFolderIdAction from '../../state/actions/get-root-folder-id-action/index.js';

/**
 * The component for the File List Page.
 */
export default class FileListPage extends StateAwareComponent {
  /**
   * An identifier of the root folder.
   */
  ROOT_FOLDER_ID;

  /**
   * Creates an instance of the File List page with set container.
   *
   * @param {Element} container - The parent element for the page.
   * @param {StateManager} stateManager - The state manager to use.
   * @param {MessageService} messageService - The service to show toast messages.
   * @param {UrlProperties} properties - The URL properties.
   */
  constructor(container, stateManager, messageService, properties) {
    super(container, stateManager);

    if (!this.ROOT_FOLDER_ID) {
      stateManager.dispatch(new GetRootFolderIdAction())
        .then((rootFolderId) => {
          this.ROOT_FOLDER_ID = rootFolderId;

          if (properties.folderId === 'root') {
            window.location.hash = FILE_LIST_ROUTE.replace(':folderId', rootFolderId);
          }

          this._messageService = messageService;

          this.render();
          stateManager.dispatch(new GetFolderAction(properties.folderId));
          stateManager.dispatch(new GetFilesAction(properties.folderId));
          stateManager.dispatch(new GetUserAction());
        });
    }
  }

  /**
   * @inheritdoc
   */
  markup() {
    const rootFolderPath = FILE_LIST_ROUTE.replace(':folderId', this.ROOT_FOLDER_ID);
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
      const folderId = this.stateManager.state.locationParameters.folderId;

      const foldersWithFileUploadInProgress = state.foldersWithFileUploadInProgress || new Set();
      this._toggleButtonLoading(this.uploadFileButton, foldersWithFileUploadInProgress, folderId);

      const foldersWithCreateFolderInProgress = state.foldersWithCreateFolderInProgress || new Set();
      this._toggleButtonLoading(this.createFolderButton, foldersWithCreateFolderInProgress, folderId);
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

      const folderId = this.stateManager.state.locationParameters.folderId;
      this._toggleButtonLoading(this.uploadFileButton, loadingFolders, folderId);
      this.fileList.foldersWithFileUploadInProgress = loadingFolders;
    });

    this.onStateChanged('uploadFileError', ({detail: {state}}) => {
      this._handleError(state.uploadFileError);
    });

    this.onStateChanged('foldersWithCreateFolderInProgress', ({detail: {state}}) => {
      const folderId = this.stateManager.state.locationParameters.folderId;
      this._toggleButtonLoading(this.createFolderButton, state.foldersWithCreateFolderInProgress, folderId);
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
        this._messageService.showError('Error: ' + error.message);
        window.location.hash = AUTHENTICATION_ROUTE;
      } else {
        console.error('User Details Loading Error:', error);
      }
    });

    this.onStateChanged('downloadFileError', ({detail: {state}}) => {
      const {fileItem, error} = state.downloadFileError;

      if (error instanceof NotFoundError && fileItem.parentId !== state.locationParameters.folderId) {
        this._messageService.showError('Error: ' + error.message);
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
   * @param {string} folderId - The identifier of the current folder.
   * @private
   */
  _toggleButtonLoading(button, loadingItems, folderId) {
    button.isLoading = loadingItems.has(folderId);
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
      this._messageService.showError('Error: ' + error.message);
      const folderId = this.stateManager.state.locationParameters.folderId;
      this.stateManager.dispatch(new GetFilesAction(folderId));
    } else if (error instanceof AuthorizationError) {
      this._messageService.showError('Error: ' + error.message);
      window.location.hash = AUTHENTICATION_ROUTE;
    } else if (error instanceof GeneralServerError) {
      this._messageService.showError('Error: ' + error.message);
    } else {
      this._messageService.showError('Unknown error. See the console for more details.');
      console.error(error);
    }
  }

  /** @inheritdoc */
  willDestroy() {
    this.removeStateChangedListeners();
  }
}
