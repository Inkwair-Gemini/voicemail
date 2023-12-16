//eletron
const { app, BrowserWindow ,Tray, ipcMain ,screen} = require('electron')

let mainWindow
let appTray = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 312,
        height: 599,
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