import UserDetails from '../user-details';
import InnerBreadcrumbs from '../inner-breadcrumbs';
import Button from '../button';
import FileList from '../file-list';
import StateAwareComponent from '../../state-aware-component';
import GetFilesAction from '../../state/actions/get-files-action';
import StateManager from '../../state/state-manager';
import {AUTHENTICATION_ROUTE} from '../../router/routes';
import RemoveItemAction from '../../state/actions/remove-item-action';
import UpdateItemAction from '../../state/actions/update-item-action';
import UploadFileAction from '../../state/actions/upload-file-action';

/**
 * The component for the File List Page.
 */
export default class FileListPage extends StateAwareComponent {
  /**
   * Creates an instance of the File List page with set container.
   *
   * @param {Element} container - The parent element for the page.
   * @param {StateManager} stateManager - The state manager to use.
   * @param {object} properties - The URL properties.
   */
  constructor(container, stateManager, properties) {
    super(container, stateManager);

    this.render();
    stateManager.dispatch(new GetFilesAction(properties.id));
  }

  /**
   * @inheritdoc
   */
  markup() {
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
                <a href="#"><h1>File Explorer</h1></a>
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
    this.breadcrumbs = new InnerBreadcrumbs(breadcrumbsContainer, {
      folder: 'Documents',
    });

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
  }

  /** @inheritdoc */
  addEventListeners() {
    this.fileList.onRemoveItem((item) => {
      this.stateManager.dispatch(new RemoveItemAction(item));
    });

    this.fileList.onItemNameChanged((item) => {
      this.stateManager.dispatch(new UpdateItemAction(item));
    });

    this.fileList.onFileSelected((folder, file) => {
      this.stateManager.dispatch(new UploadFileAction(folder, file));
    });
  }

  /** @inheritdoc */
  initState() {
    this.onStateChanged('fileList', (event) => {
      const state = event.detail.state;
      this.fileList.files = state.fileList;
      this.addEventListeners();
    });

    this.onStateChanged('isFileListLoading', (event) => {
      const state = event.detail.state;
      if (state.isFileListLoading) {
        this.fileListContainer.innerHTML = '<div class="loader"></div>';
      } else {
        this.fileListContainer.innerHTML = '';
        this.fileList = new FileList(this.fileListContainer);
      }
    });

    this.onStateChanged('locationParameters', (event) => {
      const state = event.detail.state;
      if (state.locationParameters.id) {
        this.stateManager.dispatch(new GetFilesAction(state.locationParameters.id));
      }
    });
  }

  /** @inheritdoc */
  willDestroy() {
    this.removeStateChangedListeners();
  }
}
