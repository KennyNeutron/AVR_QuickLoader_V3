import { app, BrowserWindow, ipcMain, dialog, Menu } from "electron";
import * as path from "path";
import { listPorts, spawnAvrdude, stopAvrdude } from "./avrdude-handler.js";
import {
  connectSerial,
  disconnectSerial,
  writeSerial,
} from "./serial-handler.js";
import { readFileSync } from "fs";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// In CommonJS, __dirname is available globally or injected by wrapper
const packageJsonPath = path.join(__dirname, "../package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
const APP_VERSION = packageJson.version;

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: `AVR QuickLoader v${APP_VERSION} | By KennyNeutron`,
    backgroundColor: "#1a1a1a",
    webPreferences: {
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  console.log("Main process __dirname:", __dirname);
  console.log("Preload path:", path.join(__dirname, "preload.js"));

  // Load from Vite dev server in development, or from built files in production
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Prevent the renderer from changing the window title
  mainWindow.on("page-title-updated", (e) => {
    e.preventDefault();
  });

  // Set custom menu to remove Help contents
  const template: any[] = [
    {
      label: "File",
      submenu: [{ role: "quit" }],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "Window",
      submenu: [{ role: "minimize" }, { role: "close" }],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // --- IPC Handlers ---

  // 1. List Ports
  ipcMain.handle("list-ports", async () => {
    return await listPorts();
  });

  // 2. Upload Firmware (UART)
  ipcMain.handle(
    "upload-firmware",
    async (event, { port, hexPath, mcu, baud }) => {
      const args = [
        "-v",
        "-p",
        mcu || "m328p",
        "-c",
        "arduino",
        "-P",
        port,
        "-b",
        baud || "115200",
        "-D", // Disable auto erase for arduino
        "-U",
        `flash:w:${hexPath}:i`,
      ];
      return await spawnAvrdude(event, args);
    },
  );

  // 3. ISP Upload (USBTiny/ASP)
  ipcMain.handle("isp-upload", async (event, { programmer, hexPath, mcu }) => {
    // Programmer mapping
    const progType =
      programmer === "USBtinyISP"
        ? "usbtiny"
        : programmer === "AVRISP mkII"
          ? "avrispmkII"
          : "arduino"; // Fallback

    const args = [
      "-v",
      "-p",
      mcu || "m328p",
      "-c",
      progType,
      "-U",
      `flash:w:${hexPath}:i`,
    ];
    // For ISP, path might not be needed if USB, but -P usb is implied for usbtiny
    if (progType === "avrispmkII") {
      args.push("-P", "usb");
    }

    return await spawnAvrdude(event, args);
  });

  // 4. Burn Bootloader
  ipcMain.handle(
    "burn-bootloader",
    async (event, { programmer, mcu, port }) => {
      const appPath = app.getAppPath();
      // Assuming folder structure is tools/bootloaders/atmega328p/optiboot.hex
      // We will default to m328p for now
      const bootloaderPath = path.join(
        appPath,
        "tools",
        "bootloaders",
        "atmega328p",
        "optiboot.hex",
      );

      let progType = "usbtiny";
      let extraArgs: string[] = [];

      if (programmer === "Arduino as ISP") {
        progType = "stk500v1";
        if (port) {
          extraArgs.push("-P", port, "-b", "19200");
        }
      } else if (programmer === "AVRISP mkII") {
        progType = "avrispmkII";
        extraArgs.push("-P", "usb");
      }

      const args = [
        "-v",
        "-p",
        mcu || "m328p",
        "-c",
        progType,
        ...extraArgs,
        "-U",
        `flash:w:${bootloaderPath}:i`,
      ];
      return await spawnAvrdude(event, args);
    },
  );

  // 5. Test Wiring
  ipcMain.handle("test-wiring", async (event, { programmer, mcu, port }) => {
    let progType = "usbtiny";
    let extraArgs: string[] = [];

    if (programmer === "Arduino as ISP") {
      progType = "stk500v1";
      if (port) {
        extraArgs.push("-P", port, "-b", "19200");
      }
    } else if (programmer === "AVRISP mkII") {
      progType = "avrispmkII";
      extraArgs.push("-P", "usb");
    }

    const args = ["-c", progType, "-p", mcu || "m328p", ...extraArgs];
    return await spawnAvrdude(event, args);
  });

  // 6. Stop Operation
  ipcMain.handle("stop-operation", () => {
    const killed = stopAvrdude();
    return killed;
  });

  // 7. Serial Monitor
  ipcMain.handle("serial-connect", async (event, { port, baud }) => {
    const br = parseInt(baud);
    return await connectSerial(port, isNaN(br) ? 115200 : br, event);
  });

  ipcMain.handle("serial-disconnect", async () => {
    await disconnectSerial();
    return true;
  });

  ipcMain.handle("serial-write", async (event, data) => {
    try {
      await writeSerial(data);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  });

  // 8. Open File Dialog
  ipcMain.handle("dialog:open-file", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "Hex Files", extensions: ["hex"] }],
    });
    if (result.canceled) {
      return null;
    } else {
      return result.filePaths[0];
    }
  });

  mainWindow.on("closed", () => {
    stopAvrdude();
    disconnectSerial();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
