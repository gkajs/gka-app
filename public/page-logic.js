// document.getElementById("config-before-step").addEventListener('click', function(evt) {
//     document.getElementById("index").style.display = "block";
//     document.getElementById("config").style.display = "none";

// })
const { ipcRenderer } = require('electron')

let configOpen = false;
document.getElementById('open-config-btn').addEventListener('click', function(evt) {
    if (!configOpen) {
        document.getElementById("preview").style.display = "none";
        document.getElementById("config").style.display = "block";
        this.innerHTML = '关闭配置项'
        configOpen = true
        document.body.scrollTop = 1000;
    } else {
        configOpen = false;
        document.getElementById("preview").style.display = "none";
        document.getElementById("config").style.display = "none";
        document.body.scrollTop = 0;
    }
})

document.getElementById('preview-export').addEventListener('click', function () {
    ipcRenderer.send('export-files');
})

document.getElementById(('add-files-btn')).addEventListener('click', function () {
    ipcRenderer.send('add-files');
})

document.getElementById("preview-before-step").addEventListener('click', function (evt) {
    document.getElementById("preview").style.display = "none";
    document.getElementById("index").style.display = "block";
})

