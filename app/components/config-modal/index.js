import React, { Component, PropTypes } from 'react';
import {
  Button, Row, Col, Modal, Form, Switch, Select, Input, InputNumber
} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
export default class ConfigModal extends Component {
  static propTypes = {
  };
  constructor(props, context) {
    super(props);
  }
  state = {
    visible: false,
    // config
    mini: true,
    crop: true,
    sprites: true,
    algorithm: 'left-right',
    template: 'canvas',
    prefix: '',
    spritesCount: 0,
    frameduration: 0.05,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.props.onOk(this.state);
    this.setState({
      visible: false
    })
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  onChangeMini = (result) => {
    this.setState({
      mini: result
    })
  }
  onChangeCrop = (result) => {
    this.setState({
      crop: result
    })
  }
  onChangeSprites = (result) => {
    this.setState({
      sprites: result
    })
  }
  onChangeAlgorithm = (result) => {
    this.setState({
      algorithm: result
    })
  }
  onChangeTemplate = (result) => {
    this.setState({
      template: result
    })
  }
  onChangePrefix = (result) => {
    this.setState({
      prefix: result.target.value
    })
  }
  onChangeSpritesCount = (result) => {
    // spritesCount
    this.setState({
      spritesCount: parseInt(result.target.value)
    })
  }
  onChangeFrameduration = (result) => {
    this.setState({
      frameduration: parseFloat(result.target.value)
    })
    console.error(this.state)
    
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;

    return (
      <div className="config-btn">
        <Button type="primary" icon="setting" size="large" onClick={this.showModal}>
          配置
        </Button>
        <Modal title="配置"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="form-wrap">
            <Row gutter={8} className="form-item">
              <Col span={6}>压缩</Col>
              <Switch defaultChecked type="compress" onChange={this.onChangeMini}/>
            </Row>
            <Row gutter={8} className="form-item">
              <Col span={6}>空白裁剪</Col>
              <Switch defaultChecked onChange={this.onChangeCrop}/>
            </Row>
            <Row gutter={8} className="form-item">
              <Col span={6}>合图</Col>
              <Switch defaultChecked onChange={this.onChangeSprites}/>
            </Row>
            <Row gutter={8} className="form-item">
              <Col span={6}>合图布局模式</Col>
              <Select defaultValue="left-right" style={{ width: 120 }} onChange={this.onChangeAlgorithm}>
                <Option value="left-right">left-right</Option>
                <Option value="binary-tree">binary-tree</Option>
                <Option value="top-down">top-down</Option>
              </Select>
            </Row>
            <Row gutter={8} className="form-item">
              <Col span={6}>模版</Col>
              <Select defaultValue="canvas" style={{ width: 120 }} onChange={this.onChangeTemplate}>
                <Option value="canvas">canvas</Option>
                <Option value="crop">crop</Option>
                <Option value="sprites">sprites</Option>
                <Option value="cs">cs</Option>
                <Option value="percent">percent</Option>
                <Option value="svg">svg</Option>
                <Option value="createjs">createjs</Option>
              </Select>
            </Row>
            <Row gutter={8} className="form-item">
              <Col span={6}>生成图片前缀</Col>
              <Input className="form-input" placeholder="填入字符串，如prefix" onChange={this.onChangePrefix}/>
            </Row>
            <Row gutter={8} className="form-item">
              <Col span={6}>合图数量</Col>
              <Input className="form-input" placeholder="默认 1" onChange={this.onChangeSpritesCount}/>
            </Row>
            <Row gutter={8} className="form-item">
              <Col span={6}>每帧时长</Col>
              <Input className="form-input" placeholder="默认 0.04" onChange={this.onChangeFrameduration} />
            </Row>
          </div>
        </Modal>
      </div>
    );
  }
}

