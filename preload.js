const { contextBridge, ipcRenderer } =  require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    ipcRenderer,//用于渲染进程监听，其他勿用
    openWindow: (router) => ipcRenderer.send('open-new-window', router),
    openMailWindow: (router) => ipcRenderer.send('open-mail-window', router),
    openLoginWindow: (router) => ipcRenderer.send('open-login-window', router),
    openDeleteWindow: (router) => ipcRenderer.send('open-delete-window', router),
    openRegisterWindow: (router) => ipcRenderer.send('open-register-window', router),
    receive: (channel, callback) => {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    },
    send: (channel, ...args) => {
      ipcRenderer.send(channel, ...args);
    },
})