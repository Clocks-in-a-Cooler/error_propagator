var Electron = require("electron");

var window = null;
/*
var template = [
    {
        role: 'Help',
        submenu: [
            {
                label: 'about',
                click: function() {
                    
                }
            },
            {
                label: 'Github',
            }
      ]
   }
];

var menu = Electron.Menu.buildFromTemplate(template); */
Electron.Menu.setApplicationMenu(null);

function create_window() {
    window = new Electron.BrowserWindow({
        width: 560,
        height: 580, //with menubar height should be 600
        webPreferences: {
            nodeIntegration: true,
        },
        show: false,
        resizeable: false,
        icon: "errorcalc.png",
    });
    
    window.loadFile("index.html");

    window.on("ready-to-show", function() {
        window.show();
    });
    
    window.on("closed", () => {
        window = null;
    });
}

Electron.app.on("ready", create_window);

Electron.app.on("window-all-closed", () => {
    Electron.app.quit();
});

Electron.app.on("activate", () => {
    if (window == null) {
        create_window();
    }
});