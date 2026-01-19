
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 850,
    title: "YCP 마라 가위바위보",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#0f172a',
    autoHideMenuBar: true
  });

  // 빌드된 폴더(dist) 내의 index.html을 로드합니다.
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  // 개발 중이거나 파일이 없을 경우를 대비한 처리
  win.loadFile(indexPath).catch(() => {
    // 만약 dist가 없으면 (개발 모드) localhost 시도
    win.loadURL('http://localhost:5173');
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
