const { contextBridge, ipcRenderer } =  require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openMailWindow: (router) => ipcRenderer.send('open-mail-window', router),
    openLoginWindow: (router) => ipcRenderer.send('open-login-window', router),
    openDeleteWindow: (router) => ipcRenderer.send('open-delete-window', router),
    openRegisterWindow: (router) => ipcRenderer.send('open-register-window', router),
    openDetailWindow: (router) => ipcRenderer.send('open-detail-window', router),
    openUploadWindow: (router) => ipcRenderer.send('open-upload-window', router),
    receive: (channel, callback) => {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    },
    send: (channel, ...args) => {
      ipcRenderer.send(channel, ...args);
    },
})