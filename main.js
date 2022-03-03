const {app, BrowserWindow,ipcMain} = require('electron') 
const { autoUpdater } = require('electron-updater');
const remoteMain = require("@electron/remote/main");
let win;  
require("electron-reloader")
remoteMain.initialize();
function createWindow() { 
   win = new BrowserWindow({width: 800, height: 600,webPreferences: {nodeIntegration: true,enableRemoteModule: true,contextIsolation: false}});
   remoteMain.enable(win.webContents);
   win.loadFile("index.html");
}  

app.on('ready', createWindow) ;
autoUpdater.checkForUpdatesAndNotify();
autoUpdater.on('update-available', () => {
   mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
   mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
   autoUpdater.quitAndInstall();
});