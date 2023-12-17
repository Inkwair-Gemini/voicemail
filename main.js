//eletron 主进程
const { app, BrowserWindow, Tray, ipcMain, screen } = require('electron')
const path = require('path')

let mainWindow = null;
let appTray = null;
let deleteWindow = null;
let mailWindow = null;
let loginWindow = null;
let detailWindow = null;
let uploadWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 313,
    height: 600,
    show: false, // 设置为 false，加载完成后自动隐藏
    autoHideMenuBar: true,//菜单栏
    resizable: false, // 禁止窗口缩放
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

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
    // const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
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

function openNewWindow(newWindow, route, Width, Height) {
  // 创建新窗口
  if (newWindow === null) {
    newWindow = new BrowserWindow({
      width: Width,
      height: Height,
      autoHideMenuBar:true,
      resizable: false, // 禁止窗口缩放
      maximizable: false, // 禁止最大化
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      }
    });
  }

  // 加载指定路由内容
  newWindow.loadURL(decodeURIComponent("http://localhost:8080/#/" + route))

  // 在窗口关闭时重置窗口变量
  newWindow.on('closed', () => {
    newWindow = null;
  });
}
ipcMain.on('open-delete-window', (event, route) => {
  mainWindow.hide();
  openNewWindow(deleteWindow, route, 506, 726)
});

ipcMain.on('open-mail-window', (event, route) => {
  mainWindow.hide();
  openNewWindow(mailWindow, route, 506, 726)
});

ipcMain.on('open-login-window', (event, route) => {
  openNewWindow(loginWindow, route, 406, 326)
});

ipcMain.on('open-register-window', (event, route) => {
  openNewWindow(loginWindow, route, 406, 326)
});

ipcMain.on('open-detail-window', (event, route) => {
  openNewWindow(detailWindow, route, 506, 726)
});

ipcMain.on('open-upload-window', (event, route) => {
  openNewWindow(uploadWindow, route, 400, 200)
});

ipcMain.on('login', (event,info) => {
  mainWindow.webContents.send("getLoginInfo",info)
});
ipcMain.on('avatar', (event,info) => {
  mainWindow.webContents.send("getAvatarInfo",info)
});
ipcMain.on('deleteNumber', (event,info) => {
  mainWindow.webContents.send("getDeleteNumber",info)
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