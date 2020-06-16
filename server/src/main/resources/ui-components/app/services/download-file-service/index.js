/**
 * The service that downloads the provided file.
 */
export default class DownloadFileService {
  /**
   * Downloads the provided file.
   *
   * @param {Blob} file - The file to download.
   * @param {string} fileName - The name of the file.
   */
  download(file, fileName) {
    const anchor = document.createElement('a');
    anchor.setAttribute('download', fileName);
    const url = URL.createObjectURL(file);
    anchor.setAttribute('href', url);
    anchor.click();
  }
}
