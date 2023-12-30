const { contextBridge, ipcRenderer } =  require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openMailWindow: (router,lang) => ipcRenderer.send('open-mail-window', router,lang),
    openLoginWindow: (router,lang) => ipcRenderer.send('open-login-window', router,lang),
    openDeleteWindow: (router,lang) => ipcRenderer.send('open-delete-window', router,lang),
    openRegisterWindow: (router,lang) => ipcRenderer.send('open-register-window', router,lang),
    openDetailWindow: (router, timestamp) => ipcRenderer.send('open-detail-window', router,lang, timestamp),
    openUploadWindow: (router,lang) => ipcRenderer.send('open-upload-window', router,lang),
    openRecordWindow: (router) => ipcRenderer.send('open-record-window', router),
    receive: (channel, callback) => {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    },
    send: (channel, ...args) => {
      ipcRenderer.send(channel, ...args);
    },
})