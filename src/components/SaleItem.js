import React, { Component } from 'react';
import { Icon, Button, Modal, message, Input, List, Form, Comment, Avatar, } from "antd";
import "./SaleItem.css";
import UserAvatar from './UserAvatar';
import { getGMTTimeDiff, MyStorage, API } from '../utils';

const user = {
    username: "OhMyGakki",
    self_intro: "今天真是美好的一天呐",
};

const item = {
    timestamp: "去年八月",
    user: user,
    price: 100,
    title: "闲置iphone5s出",
    text: "16G内存轻微划痕，前后贴膜，指纹灵敏 可注销，有需要的私聊"
};

export default class SaleItem extends Component {
    state = { sale: this.props.sale, replies: this.props.sale.comments, visible: false, value: "" };
    render() {
        const { sale, replies, value, visible } = this.state;
        return (
            <div className="Card" style={{padding: 16, marginBottom: 0, margin: 8, width: 322}}>
                <div>
                    <ItemHeader item={sale} />
                    <ItemContent item={sale} />
                    <ItemFooter item={sale} onReplyClick={()=>this.setState({visible: true})}/>
                    <SaleComments 
                        value={value}
                        replies={replies} 
                        visible={visible} 
                        onChange={e => this.setState({value: e.target.value})}
                        onClose={() => this.setState({visible: false})}
                        onSubmit={this.handleSubmit}
                    />
                </div>
            </div>
        );    
    }

    handleSubmit = () => {
        API.SaleComment.create({
            sale_id: this.state.sale.id, 
            text: this.state.value
        }, (responseJson)=>{
            message.success("评论成功");
            this.setState({replies: [...this.state.replies, responseJson], value:''});
        }, (error)=>{
            message.error("评论失败 😰");
        });
    }
}

const ItemHeader = ({item}) => (
    <div style={{display: "flex"}}>
        
        <UserAvatar style={{marginRight: 8}} size={40} />
        <div style={{flex: 1, textAlign: "left", }}>
            <div>
                <a style={{fontWeight: "bold", color: '#333'}}>{item.user.username}</a>
            </div>
            <span>{getGMTTimeDiff(item.timestamp)}</span>
        </div>
        <div style={{color: "#ff0036", fontWeight: "bold"}}>
            <span>¥</span>
            <span style={{fontSize: 22}}>{item.price}</span>
        </div>
    </div>
);

const ItemContent = ({item}) => {
    return (
        <div style={{textAlign: 'left', paddingTop: 12}}>
            <span style={{fontWeight: "bold", color: "#555"}}>{item.title}</span>
            <div style={{paddingTop: 8, paddingBottom: 12}}>
                <span>{item.text}</span>
            </div>
            <div style={{position: 'relative', paddingBottom: "80%", width: "100%", backgroundColor: '#ddd', borderRadius: 4, borderWidth: 1, borderColor: '#eee', borderStyle: "solid"}}>
                <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
                    <img style={{ borderRadius: 4, display: "block", width: "100%", height: "100%"}} src={item.pics[0].replace("http://asserts.fondoger.cn/", "")} />
                </div>
            </div>
        </div>
    );
};  

const ItemFooter = ({item, onReplyClick}) => (
    <div style={{display: "flex", marginTop: 12}}>
        <Button icon="message" onClick={onReplyClick}>
            {item.comments.length == 0 ? "添加评论" : `${item.comments.length} 条评论`}
        </Button>
        <div style={{flex: 1}} />
        <Button>
            <Icon theme="filled" style={{paddingTop:4, fontSize: 16, color:"#f5222d"}} type="heart" />
            我想要
        </Button>
    </div>
);



const CommentList = ({replies}) => (
    <List
      className="comment-list"
      header={`共${replies.length}条评论` }
      dataSource={replies}
      itemLayout="horizontal"
      renderItem={item =>
        <Comment
          avatar={item.user.avatar + '!thumbnail'}
          author={item.user.username}
          datetime={<span>{getGMTTimeDiff(item.timestamp)}</span>}
          content={<p>{item.text}</p>}
        />
      }
    />
  );
  
  const TextArea = Input.TextArea;
  const Editor = ({
      onChange, onSubmit, submitting, value,
  }) => (
      <div>
        <Form.Item>
          <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            loading={submitting}
            onClick={onSubmit}
            type="primary"
          >
            发表评论
          </Button>
        </Form.Item>
      </div>
  );
  
  const SaleComments = ({sale, visible, user, value, onChange, onSubmit, replies, onClose }) => (
    <Modal visible={visible} onCancel={onClose} footer={null}>
      <CommentList sale={sale} replies={replies}/>
      <Comment
        avatar={<Avatar src={MyStorage.user.avatar + '!thumbnail'} />}
        content={(
          <Editor
            value={value}
            onSubmit={onSubmit}
            onChange={onChange}
          />
        )}
      />
    </Modal>
  );