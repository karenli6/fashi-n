//backend
const { app, BrowserWindow } = require('electron')
const path = require('path')
const https = require('https')
var answer

//PYTHON SHELL
const { PythonShell } = require("python-shell");

var pyshell = new PythonShell('sender.py');
//python shell end

//sending and getting data from html
const { ipcMain } = require('electron')

// receive message from index.html 
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg);

  // send message to index.html
  answer = arg
  
  type1 = answer[0];
  link1 = answer[1];
 
  var clothing1
  console.log(" clothing1 link is "+ link1);
  pyshell.send(JSON.stringify(link1));
  pyshell.on('message', function (message) {
    console.log("here is message " + message);
    if (message){
      console.log("message not empty");
      var clothing_weights = { "top": 0.33, "pants": 0.875, "jacket": 2.5, "dress": 1 };
      var w1 = 0;
      for (var val in clothing_weights) {
        if (val === type1) {
          w1 = clothing_weights[val];
          break;
        }
      }
      message = message*w1;
      console.log("final message is "+message);
      event.sender.send('asynchronous-reply', message);

    }
    
  });


  // end the input stream and allow the process to exit
  pyshell.end(function (err) {
    if (err) {
      throw err;
    };

    console.log('finished');
  });


});
//end between html and javascript
// console.log("answer is " + answer);
let mainWindow
function createWindow() {
  // create
  mainWindow = new BrowserWindow({
    width: 1220,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })


  //load frontend
  mainWindow.loadFile('index.html')
  mainWindow.setMenu(null)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // mainWindow.openDevTools()
}


app.on('ready', createWindow)
app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {

  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

