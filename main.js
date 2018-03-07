const path = require('path'),
      url = require('url'),
      electron = require('electron');

const logic = require('./main/logic.js');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 800});

    mainWindow.webContents.debugger.attach('1.1');

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'public/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function () {
        mainWindow = null;
    })

    logic.main(mainWindow);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
