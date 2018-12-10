import React, { Component } from "react";
import { Popover, Input, Button, message } from 'antd';
import "./WriteStatusCard.css";
import IconFont from "./IconFont";
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { API } from '../utils';


var event = new require('events').EventEmitter();

export default class WriteStatusCard extends Component {
  state = { 
    text: "",
    submitDisable: true,
    imageUrls: [],
  };
  render() {
    return (
      <div className="Card WriteStatusCard">
        <div className="WriteStatusCard-title">
          <span>有什么新鲜事想告诉大家？</span>
        </div>
        <Input.TextArea 
          className="WriteStatusCard-input"
          autosize={{minRows: 4, maxRows: 10}} 
          value={this.state.text}
          onChange={this.handleOnChange}
        />
        <div className="WriteStatusCard-footer">
          <div className="WriteStatusCard-footerWrapper">
            <FooterItem icon="#icon-emoji" color="#ff3700" title="表情" 
                content={<EmojiCard />} placement="bottomLeft"/>
            <FooterItem icon="#icon-image" color="#75c82b" title="图片" />
            <FooterItem icon="#icon-topic" color="#4285f4" title="话题"  
                content={<TopicCard />} arrowPointAtCenter/>
          </div>
          <button 
            type="button" 
            className="Button" 
            onClick={this.handleOnSubmit}
            disabled={this.state.submitDisable}>
            发布
          </button>
        </div>
      </div>
    );
  }
  handleOnChange = (e) => {
    const text = e.target.value;
    this.setState({text, submitDisable: (text==="")});
  }
  handleOnSubmit = () => {
    API.Status.create({
      type: "USER_STATUS",
      text: this.state.text,
      pics: this.state.imageUrls,
    }, responseJson => {
      message.success("发布成功");
      this.setState({text: "", imageUrls: []});
      this.props.receiveNewStatus(responseJson);
    }, error => {
      message.error("出了点儿问题😓");
      console.log(error);
    });
  }
}
const FooterItem = ({onClick, icon, color, content, 
  title, arrowPointAtCenter, placement}) => (
  <Popover
    trigger="click"
    content={content}
    placement={placement||"bottom"}
    overlayClassName="WriteStatusCard-Overlay"
    arrowPointAtCenter={arrowPointAtCenter||false}
  >
    <a href="#" className="WriteStatusCard-footerItem">
      <IconFont icon={icon} style={{color: color}}/>
      <span>{title}</span>
    </a>
  </Popover>
);

const EmojiCard = () => (
  <div className="EmojiCard" >
    <Picker 
      style={{width: 320}} 
      sheetSize={32} 
      set='apple' 
      title="选择emoji表情" 
      showPreview={false}
      showSkinTones={false}
      backgroundImageFn={()=>"http://asserts.fondoger.cn/other/emoji_sheet_64.png"}
    />
  </div>
);

const TopicCard = ({callback}) => {
  return (
    <div className="TopicCard" >
      <a href="javascript:void(0)" className="TopicCard-insert">
        <span>插入话题</span>
      </a>
    </div>
  );
}