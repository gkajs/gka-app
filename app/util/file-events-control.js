class FilesEventControl {
    construtor () {
        this.dragEventFunc = function (e) {
          e.preventDefault();
          e.stopPropagation();
          console.log("捕获到文件拖拽事件")

          for (let f of e.dataTransfer.files) {
              this.push(f.path);
              console.log('你添加了文件 ', f.path)
          }
        };

        this.dragOverEvent = function (e) {
          e.preventDefault();
          e.stopPropagation();
        };
        this.files = [];
    }

    add() {
        this.dragEvent = document.addEventListener('drop', this.dragEventFunc);

        this.dragOverEvent = document.addEventListener('dragover', this.dragOverEventFunc);
    }
    remove() {
        document.removeEventListener("drop", this.dragEventFunc);
        document.removeEventListener("dragover", this.dragOverEventFunc);
    }
}

module.exports = {
    FilesEventControl
}