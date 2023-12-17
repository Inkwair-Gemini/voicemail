const { contextBridge, ipcRenderer } =  require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openWindow: (router) => ipcRenderer.send('open-new-window', router),
    openMailWindow: (router) => ipcRenderer.send('open-mail-window', router),
    openLoginWindow: (router) => ipcRenderer.send('open-login-window', router),
    openRegisterWindow: (router) => ipcRenderer.send('open-register-window', router),
    openDetailWindow: (router) => ipcRenderer.send('open-detail-window', router),
})