//eletron 主进程
const { app, BrowserWindow, Tray, ipcMain, screen, dialog } = require('electron')
const path = require('path')

let mainWindow = null;
let appTray = null;
let deleteWindow = null;
let mailWindow = null;
let loginWindow = null;
let detailWindow = null;
let uploadWindow = null;
let recordWindow = null;
let registerWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 313,
    height: 600,
    show: false, // 设置为 false，加载完成后自动隐藏
    skipTaskbar: true, // 将窗口隐藏在任务栏中
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

function openNewWindow(route, Width, Height, lang) {
  windowInstance = new BrowserWindow({
    icon: './public/Mail II.png',
    width: Width,
    height: Height,
    autoHideMenuBar: true,
    resizable: false, // 禁止窗口缩放
    maximizable: false, // 禁止最大化
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // 加载指定路由内容
  windowInstance.loadURL(decodeURIComponent("http://localhost:8080/#/" + route))

  // 等待窗口加载完毕
  windowInstance.once('ready-to-show', () => {
    // 当窗口加载完毕后，发送消息
    windowInstance.webContents.send("changeLang", lang); // 更换语言
    windowInstance.show(); // 窗口加载完毕后显示窗口
  });

  let needsFocusFix = false;
  let triggeringProgrammaticBlur = false;

  windowInstance.on('blur', (event) => {
    if (!triggeringProgrammaticBlur) {
      needsFocusFix = true;
    }
  })

  windowInstance.on('focus', (event) => {
    if (needsFocusFix) {
      needsFocusFix = false;
      triggeringProgrammaticBlur = true;
      setTimeout(function () {
        windowInstance.blur();
        windowInstance.focus();
        setTimeout(function () {
          triggeringProgrammaticBlur = false;
        }, 100);
      }, 100);
    }
  })

  windowInstance.on('closed', () => {
    windowInstance = null;
  });

  return windowInstance
}
ipcMain.on('open-delete-window', (event, route, lang) => {
  mainWindow.hide();
  if (deleteWindow === null || deleteWindow.isDestroyed()) {
    deleteWindow = openNewWindow(route, 506, 726, lang)
  }
  else {
    deleteWindow.focus()
  }
});

ipcMain.on('open-mail-window', (event, route, lang) => {
  mainWindow.hide();
  if (mailWindow === null || mailWindow.isDestroyed()) {
    mailWindow = openNewWindow(route, 506, 726, lang)
  }
  else {
    mailWindow.show()
    mailWindow.focus()
  }
});

ipcMain.on('open-login-window', (event, route, lang) => {
  if (loginWindow === null || loginWindow.isDestroyed()) {
    loginWindow = openNewWindow(route, 406, 326, lang)
  }
  else {
    loginWindow.show()
    loginWindow.focus()
  }
});

ipcMain.on('open-register-window', (event, route, lang) => {
  loginWindow.hide() //先隐藏否则注册子窗口不会有ready-to-show方法
  if (registerWindow === null || registerWindow.isDestroyed()) {
    registerWindow = openNewWindow(route, 406, 326, lang)
  }
  else {
    registerWindow.focus()
  }
});

ipcMain.on('open-detail-window', (event, route, lang, id) => {
  mailWindow.hide()
  if (detailWindow === null || detailWindow.isDestroyed()) {
    detailWindow = openNewWindow(route, 506, 726, lang, id)
  }
  else {
    detailWindow.focus()
  }
});

ipcMain.on('open-upload-window', (event, route, lang) => {
  if (uploadWindow === null || uploadWindow.isDestroyed()) {
    uploadWindow = openNewWindow(route, 400, 200, lang)
  }
  else {
    uploadWindow.focus()
  }
});

ipcMain.on('open-record-window', (event, route) => {
  if (recordWindow === null) {
    recordWindow = new BrowserWindow({
      width: 56,
      height: 44,
      autoHideMenuBar: true,
      resizable: false, // 禁止窗口缩放
      maximizable: false, // 禁止最大化
      skipTaskbar: true, // 将窗口隐藏在任务栏中
      draggable: true,
      frame: false,
      alwaysOnTop: true,
      x: 1350,
      y: 650,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      }
    });
    // 加载指定路由内容
    recordWindow.loadURL(decodeURIComponent("http://localhost:8080/#/" + route))

    // 在窗口关闭时重置窗口变量
    recordWindow.on('closed', () => {
      recordWindow = null;
    });
  }
});

ipcMain.on('login', (event, info) => {
  mainWindow.webContents.send("getLoginInfo", info)
});
ipcMain.on('avatar', (event, info) => {
  mainWindow.webContents.send("getAvatarInfo", info)
});
ipcMain.on('deleteNumber', (event, info) => {
  mainWindow.webContents.send("getDeleteNumber", info)
});
ipcMain.on("closeRecord", (event) => {
  if (recordWindow) {
    recordWindow.close()
    recordWindow = null; // 如果recordWindow存在，则关闭它
  }
});
ipcMain.on("changeLang", (event, lang) => {
  if (deleteWindow !== null && !deleteWindow.isDestroyed()) {
    deleteWindow.webContents.send("changeLang", lang)
  }
  if (mailWindow !== null && !mailWindow.isDestroyed()) {
    mailWindow.webContents.send("changeLang", lang)
  }
  if (loginWindow !== null && !loginWindow.isDestroyed()) {
    loginWindow.webContents.send("changeLang", lang)
  }
  if (detailWindow !== null && !detailWindow.isDestroyed()) {
    detailWindow.webContents.send("changeLang", lang)
  }
  if (uploadWindow !== null && !uploadWindow.isDestroyed()) {
    uploadWindow.webContents.send("changeLang", lang)
  }
  if (recordWindow !== null && !recordWindow.isDestroyed()) {
    recordWindow.webContents.send("changeLang", lang)
  }
  if (registerWindow !== null && !registerWindow.isDestroyed()) {
    registerWindow.webContents.send("changeLang", lang)
  }
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

process.on('uncaughtException', (error) => {
  // 在这里你可以记录错误到日志或者执行其他逻辑
  console.error('An uncaught exception occurred:', error);
});