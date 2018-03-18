const { ipcRenderer } = require('electron')

let onAlreadyAddFiles = (_config, cb) => {
  console.error("already add files")
  ipcRenderer.once('already-add-files', function (event, data) {
    ipcRenderer.send('generate-gka', { config: _config });
    cb();
  })
}

let onGkaOver = (cb) => {
  ipcRenderer.once('gka-over', function (event, data) {
    let output = data.output;
    cb(output);
  });
}

let  sendExportFiles = () => {
  ipcRenderer.send('export-files');
}

let sendAddFiles = () => {
  console.error("add-files")
  ipcRenderer.send('add-files');
}

let openFiles = () => {
  ipcRenderer.send('open-files')
}


module.exports = {
  onAlreadyAddFiles,
  onGkaOver,
  sendExportFiles,
  sendAddFiles,
  openFiles,
}