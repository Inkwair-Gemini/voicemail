//eletron
const { app, BrowserWindow ,Tray, ipcMain ,screen} = require('electron')

let mainWindow
let appTray = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 313,
        height: 600,
        show: false, // 设置为 false，加载完成后自动隐藏
        autoHideMenuBar:true,//菜单栏
        frame:false,
        alwaysOnTop: true,
    })

    mainWindow.loadURL('http://localhost:8080') // 本地运行的 Vue 项目的地址
    
    // 当窗口失去焦点时隐藏窗口
    mainWindow.on('blur', () => {
        mainWindow.hide();
    });

    mainWindow.on('closed', () => {
        app.quit()
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.hide(); // 加载完成后隐藏窗口
        setTray();
    });
}

function setTray() {
    appTray = new Tray('./public/Mail II.png');
    appTray.setToolTip('右键打开设置');
    appTray.on('right-click', () => {
        const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
        const windowSize = mainWindow.getSize();
        const cursorPosition = screen.getCursorScreenPoint();
        const x = cursorPosition.x - windowSize[0];
        const y = cursorPosition.y - windowSize[1];

        mainWindow.setPosition(x, y); // 设置窗口位置
        mainWindow.show(); // 点击托盘图标显示窗口
    });
  }

ipcMain.on('open-tray', () => {
    setTray();
});

function createDeleteWindow() {
    const newWindow = new BrowserWindow({
      width: 600,
      height: 400,
      show: false, // 不立即显示新窗口
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
  
    newWindow.loadFile('newWindow.html'); // 加载新窗口的 Vue 组件
  
    newWindow.once('ready-to-show', () => {
      newWindow.show(); // 当新窗口准备好后显示
    });
  
    newWindow.on('closed', () => {
      // 当新窗口关闭时，显示主窗口内容
      if (mainWindow) {
        mainWindow.webContents.executeJavaScript('showParentContent()');
      }
    });
  }

ipcMain.on('open-delete-window', () => {
    createDeleteWindow();
  });

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})