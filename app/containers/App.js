import React, { Component, PropTypes } from 'react';
import ConfigModal from '../components/config-modal/index.js'
import {
  Button, Row, Col, Icon, Progress
} from 'antd';

import {
  onAlreadyAddFiles,
  onGkaOver,
  sendExportFiles,
  sendAddFiles,
  openFiles,
} from '../ipc/ipc.js'

const ButtonGroup = Button.Group;
export default class App extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props);
    const self = this;
    this.state = {
      config : {
        mini: true,
        crop: true,
        sprites: true,
        algorithm: 'left-right',
        template: 'canvas',
        prefix: '',
        spritesCount: 0,
        frameduration: 0.05,
      },
      iframeShow: false,
      iframeSrc: '',
      percent: 0,
      showProgress: false,
    }
    this.onAddFileClick = this.onAddFileClick.bind(this);
    this.onConfigOk = this.onConfigOk.bind(this);
    this.gotoIndex = this.gotoIndex.bind(this);
    this.exportFile = this.exportFile.bind(this);
    this.openFile = this.openFile.bind(this);
  }

  onConfigOk(_config) {
    this.setState({
      config: _config
    })
  }
  gotoIndex() {
    this.setState({
      iframeShow: false
    })
  }
  showProgress(long_second, time) {
    const self = this;
    let now = 0;
    self.setState({
      showProgress: true
    });

    for (let i = 0; i <= time; i++) {
      let interval = long_second / time;
      setTimeout(function () {
        let percent = parseInt(now);
        console.error(percent)
        self.setState({
          percent : percent
        });
        now += (99 / time);
      }, interval * i * 1000)
    }
  }
  exportFile() {
    sendExportFiles();
  }
  openFile() {
    openFiles();
  }
  onAddFileClick() {
    const self = this;
    sendAddFiles();
    onAlreadyAddFiles(self.state.config, function() {
      self.showProgress(4, 8) // 4秒，变化8次
    });
    onGkaOver(function (output) {
      console.error(output)
      self.setState({
        iframeSrc: '',
        iframeShow: true,
        percent: 100
      })

      setTimeout(function() {
        // iframeSrc一定得set为空，再set为正确的值，否则前后的iframe src一样不会重新加载资源
        self.setState({
          iframeSrc: output + '/gka.html',
          showProgress: false,
        })
      }, 500)

        
    });
  }
  render() {
    let content = (
      <div className="content" >
        <div className="add-file-btn" onClick={this.onAddFileClick}></div>
        <ConfigModal onOk={this.onConfigOk}></ConfigModal>
      </div>
    );
    let iframe = (
      <div className="preview-wrapper">
        <iframe className="iframe-preview" src={this.state.iframeSrc}></iframe>
        <div>

          <Button className="preview-btn" type="danger"  size="large" onClick={this.gotoIndex}>
            取消
          </Button>
          <Button className="preview-btn" type="primary" icon="folder-add" size="large" onClick={this.exportFile}>
            另存为
          </Button>
          <Button className="preview-btn" type="primary" icon="bars" size="large" onClick={this.openFile}>
            打开
          </Button>
        </div>

      </div>
    );
    let progress = (
      <Progress type="circle" className="gka-progress" percent={this.state.percent}></Progress>
    )
    let vdom = this.state.iframeShow ? iframe :  content;
    return (
      <div className="index-wrap">
        { this.state.showProgress ? progress: '' } 
        { !this.state.showProgress ? vdom : ''}
      </div>
    );
  }
}

