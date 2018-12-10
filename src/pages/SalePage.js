import React, { Component } from "react";
import { List } from 'antd';
import { SaleItem } from "../components";
import { Button, Modal, Input } from "antd";
import "./SalePage.css";

const data = [1, 2, 3, 4, 6, 5, 8];

export default class SalePage extends Component {
  state = { visiable: false, confirmLoading: false, commentsVisible: false };
  render() {
    const { visible, confirmLoading, } = this.state;
    return (
      <div className="main-container" style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{marginBottom: 10, }}>
          <Button icon="edit" onClick={this.showModal}>发布二手</Button>
        </div>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <SaleItem />
            </List.Item>
          )}
        />
        <Modal
          title="发布宝贝"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="发布"
          cancelText="取消"
        >
          <Input placeholder="在这里输入宝贝标题" />
          <Input.TextArea
            placeholder="在这里输入宝贝介绍"
            style={{resize: "none", marginTop: 20, minHeight: 200}}
          />
        </Modal>
      </div>
    );
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
}
