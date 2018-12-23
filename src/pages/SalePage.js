import React, { Component } from "react";
import { SaleItem } from "../components";
import { List, Button, Modal, Input, InputNumber, message } from "antd";
import "./SalePage.css";
import { API } from '../utils';

export default class SalePage extends Component {
  state = { visiable: false, sales: [] };

  componentDidMount() {
    API.Sale.get({}, (responseJson)=>{
      this.setState({sales: responseJson});
    }, (err)=>{
      message.error("加载失败，请刷新重试");
    });
  }

  render() {
    const { visible, sales} = this.state;
    return (
      <div className="main-container" style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{marginBottom: 10, }}>
          <Button 
            icon="edit" 
            onClick={() => this.setState({ visible: true })}>
            发布二手
          </Button>
        </div>
        <SalesList sales={sales} />
        <NewSaleDialog 
          visible={visible}
          onClose={() => this.setState({visible: false})} 
          onNewSale={sale => this.setState({sales: [sale, ...sales]})}
        />
      </div>
    );
  }
}

const SalesList = ({sales}) => (
  <div style={{flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between', margin: -8}}>
    {
      sales.map(item => <SaleItem style={{flex: 1}} key={item.id.toString()} sale={item}/>)
    }
  </div>
);

// const SalesList = ({sales}) => (
//   <List
//     grid={{ gutter: 16, column: 3 }}
//     dataSource={sales}
//     renderItem={item => (
//       <List.Item key={item.id.toString()}>
//         <SaleItem sale={item}/>
//       </List.Item>
//     )}
//   />
// );


class NewSaleDialog extends Component {
  state = { 
    loading: false,
    title: "",
    price: "",
  };
  render() {
    const { loading, } = this.state;
    return(
      <Modal
        title="发布宝贝"
        visible={this.props.visible}
        onOk={this.onSubmit}
        confirmLoading={loading}
        onCancel={this.props.onClose}
        okText="发布"
        cancelText="取消"
      >
        <div style={{display: 'flex'}}>
          <Input 
            value={this.state.title}
            placeholder="在这里输入宝贝标题" 
            onChange={ e => this.setState({title: e.target.value}) }/>
          <InputNumber 
            value={this.state.price}
            placeholder="价格"
            style={{marginLeft: 10}}
            onChange={ value => this.setState({price: value}) }/>
        </div>
        <Input.TextArea
          placeholder="在这里输入宝贝介绍"
          style={{resize: "none", marginTop: 20, minHeight: 200}}
          value={this.state.text}
          onChange={ e => this.setState({text: e.target.value})}
        />
      </Modal>
    );
  }
  onSubmit = () => {
    this.setState({loading: true});
    API.Sale.create({
      title: this.state.title, 
      text: this.state.text, 
      price: parseFloat(this.state.price), 
      location: 'xueyuanlu',
      category: 'other',
      pics: [`https://picsum.photos/500/500/?image=${getRandomInt(500)}`],
    }, (responseJson)=>{
      message.success("发布宝贝成功");
      this.setState({loading: false});
      this.props.onNewSale(responseJson);
      this.props.onClose();
    }, (error) => {
      this.setState({loading: false});
      message.error("发布宝贝失败 😰");
    });
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}
