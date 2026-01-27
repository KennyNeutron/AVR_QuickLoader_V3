import { contextBridge, ipcRenderer } from "electron";

declare global {
  interface Window {
    ipcRenderer: typeof ipcRenderer;
  }
}

// Expose ipcRenderer to the renderer process
// Since contextIsolation is false, we can just attach to window.
// However, standard practice with contextIsolation: true is contextBridge.
// Given main.ts has contextIsolation: false, we can do this directly or via contextBridge.
// If contextIsolation is false, contextBridge might not work as expected or simply attach to window.
// Let's just attach directly to window since contextIsolation is false.

window.ipcRenderer = ipcRenderer;
