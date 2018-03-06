const electron = require("electron");
const gka = require("gka");
const fs = require('fs');
const path = require('path');
const {
  warn, log, err
} = require('../util/utils.js');
const DIALOG = electron.dialog;
const IPCMAIN = electron.ipcMain;

let cache = {
  inputFileDir  : '', // 记住打开的位置
  outputDir     : '', // 同上
  gkaConfig     : {}, // 缓存配置
};

let openInputFilePath = (rendererWindow, defaultpath, cb) => {
  
  let afterOpenDirectory = function (res) {
    if (!res)
      return;
    cache.inputFileDir = res[0];
    log("main: add-files, --openFile--", cache.inputFileDir);
    rendererWindow.webContents.send('already-add-files', {
      dir: cache.inputFileDir
    });
  };


  DIALOG.showOpenDialog({
    defaultPath: cache.inputFileDir || '',
    properties: [
      'openDirectory',
    ]
  }, afterOpenDirectory)

}

let openExportFileDirectory = (rendererWindow) => {

  let afterOpenSaveDirectory = function (res) {
    if (!res)
      return;
    cache.outputDir = res;
    let config = Object.assign(cache.gkaConfig, {
      output: res,
      callback: function () {}
    });
    generateGka(config);
  };

  DIALOG.showSaveDialog({
    title: 'gka',
    defaultPath: cache.outputDir || 'gka'
  }, afterOpenSaveDirectory)

}

let generateGka = (config, cb = function () {}) => {
  let defaultOuput = path.join(__dirname, '../public/gka-items');
  let defaultSrc   = cache.inputFileDir;

  let gkaConfig = {
    src          : config.src || defaultSrc,
    output       : config.output || defaultOuput,      // 输出文件夹地址
    // cmd       : config.cmd || "tool",
    info         : config.info || true,
    prefix       : config.prefix || "prefix-",    // 重命名前缀
    // mini      : config.mini || true,           // 压缩
    // crop      : config.crop || true,           // 空白裁剪
    // unique    : config.unique || true,         // 去重
    // sprites   : config.sprites || true,        // 合图
    tpl          : config.tpl || 'canvas',
    algorithm    : config.algorithm || 'left-right',
    spritesCount : config.spritesCount || 0,    // 生成多合图，指定几张图片合成一张合图，可选
    callback: function (output) {
      log(`iiiiii im over`, gkaConfig);
      cb(output);
    }
  }
  log(`gka config`, JSON.stringify(gkaConfig))
  cache.gkaConfig = gkaConfig;
  gka(gkaConfig)
}

const main = (rendererWindow) => {
  /* 添加文件 */
  IPCMAIN.on('add-files', (event, arg) => {
    log(`main: add-files`);
    openInputFilePath(rendererWindow);
  });
  /* 导出文件 */
  IPCMAIN.on('export-files', (event, arg) => {
    log(`main: export-files`);
    openExportFileDirectory(rendererWindow);
  });
  /* 生成gka文件 */
  IPCMAIN.on('generate-gka', (event, arg) => {
    log(`main: generate-gka`);
    generateGka(arg.config, function (output) {
      rendererWindow.webContents.send('gka-over', {
        output: output
      });
    });
  });
}

exports.main = main;
