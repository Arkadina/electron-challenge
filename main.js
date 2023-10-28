const { app, BrowserWindow } = require("electron");

const path = require("path");

const createWindow = () => {
  const iconPath = path.join(__dirname, "/assets/icon.png");
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: iconPath,
    resizable: false,
    title: "Electron Challenge",
  });

  win.loadFile("index.html");
  // win.loadURL("https://tapedin.com.br");

  if (process.platform === "darwin") {
    app.dock.setIcon(iconPath);
  }
};

if (require("electron-squirrel-startup")) app.quit();

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

if (process.env.DEV == "true") {
  require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
  });
}
