const { contextBridge, ipcRenderer } =  require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openWindow: (router) => ipcRenderer.send('open-new-window', router)
})