import React, { Component } from "react";
import IconFont from "./IconFont";
import UserAvatar from "./UserAvatar";
import ImageCard from './ImageCard';
import { Dropdown, Icon, Menu, Form, Button, Input, Comment, List, Avatar, message } from "antd";
import "./StatusItem.css";
import { getGMTTimeDiff, EmojiSpan, API, MyStorage } from '../utils';

export default class StatusItem extends React.Component {
  state = {
    status: this.props.status,
    replies: [],
    showComments: false,
    commentValue: "",
  };
  render() {
    const { showComments, commentValue, replies, status } = this.state;
    return (
      <div className="Card StatusItem">
        <div className="StatusItem-wrapper">
          <div className="StatusItem-leftColumn" >
            <UserAvatar size={50} user={status.user} />
          </div>
          <div className="StatusItem-rightColumn">
            <div className="StatusItem-header">
              <UserInfo status={status} />
              <ActionDropDown
                status={status}
                onDelete={()=>alert("delete")}
              />
            </div>
            <StatusContent status={status} />
          </div>
        </div>
        <StatusCard status={status} />
        { this.renderStatusFooter(status) }
        { showComments ?
          <StatusComments
            status={status}
            replies={replies}
            value={commentValue}
            onChange={(e)=>this.setState({commentValue: e.target.value})}
            onSubmit={()=> this.handleReplySubmit }
          /> : null
        }
      </div>
    );
  }

  handleReplySubmit = () => {
    const { status, replies, commentValue } = this.state;
    API.StatusReply.create({ 
      status_id: status.id, 
      text: commentValue,
    }, (responseJson) => {
      this.setState({ replies: [...replies, responseJson ]});
    }, (error) => {
      message.error("回复失败 😰");
    });
  }

  handleCommentOnPress = () => {
    const { status, replies } = this.state;
    API.StatusReply.get({
      status_id: status.id,
      offset: replies.length,
      limit: 100,
    }, (responseJson) => {
      var _replies = [...replies, ...responseJson];
      this.setState({
        replies: _replies,
      });
    }, (error) => { });
    this.setState({showComments: !this.state.showComments});
  };

  renderStatusFooter(status) {
    return (
      <div className="StatusItem-footer">
        <FooterItem icon="#icon-shoucang" title="收藏" />
        <FooterItem icon="#icon-zhuanfa2" title="转发" />
        <FooterItem icon="#icon-pinglun"  title="评论" onClick={this.handleCommentOnPress} />
        <FooterItem icon="#icon-dianzan2" title="点赞" />
      </div>
    );
  }
}

const textToContentArray = (text) => {
  const regexp = new RegExp(`(#[\\s\\S]+?#|[\n\r]|@[\\u4e00-\\u9fa5_a-zA-Z0-9\\-]+)`, 'g');
  const contentArray = [];
  let regArray = text.match(regexp);
  if (!regArray)
    regArray = [];
  var pos = 0;
  for (let i = 0; i < regArray.length; i++) {
    var t = text.indexOf(regArray[i], pos);
    if (t != pos) {
      contentArray.push({'text': text.substring(pos, t)});
      pos = t;
    }
    var t2 = pos + regArray[i].length;
    if (text[pos]=='@') {
      contentArray.push({'at': text.substring(pos+1, t2)})
    } else if (text[pos]=='#') { // topic
      contentArray.push({'topic': text.substring(pos+1, t2-1)});
    } else if (text[pos] === '\n' || text[pos] === '\r') {
      contentArray.push({'newline': true});
    } else {
      console.error("impossible");
    }
    pos = t2;
  }
  if (pos != text.length) {
    contentArray.push({'text': text.substring(pos, text.length)});
  }
  return contentArray;
}

const StatusContent = ({status}) => {
  const contentArray = textToContentArray(status.text);
  return (
    <div className="StatusItem-content">
    { contentArray.map((content, index) => {
        if (content.text) {
          return <EmojiSpan text={content.text} />
        } else if (content.at) {
          return <a href="#" style={{color: "#0f88eb"}}>@{content.at}</a>
        } else if (content.topic) {
          return <a href="#" style={{color: "#0f88eb"}}>#{content.topic}#</a>
        } else if (content.newline) {
          return <br/>
        }
    })}
    </div>
  );
}

const UserInfo = ({status}) => {
  const user = status.user;
  return (
    <div className="StatusItem-userInfo">
      <div className="wrapper">
        <a className="username">{user.username}</a>
        <EmojiSpan style={{marginLeft: 5}} text={user.self_intro} />
      </div>
      <span className="timestamp">{getGMTTimeDiff(status.timestamp)}</span>
      <span className="timestamp"> 来自 goodbuaa.com</span>
    </div>
  );
}

const StatusCard = ({status}) => {
  if (status.pics.length != 0) {
    const images = status.pics.map(url => ({uri: url + '!mini5', bigUri: url}));
    return (<ImageCard style={{marginTop: 12}} images={images}/>);
  }
  return null;
}

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

const StatusComments = ({status, user, value, onChange, onSubmit, replies, }) => (
  <div className="StatusComments">
    <CommentList status={status} replies={replies}/>
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
  </div>
);

const ActionDropDown = ({status, onDelete}) => (
  <div>
    <Dropdown
      style={{height: 30}}
      trigger={['click']}
      overlayStyle={{width: 150}}
      placement="bottomRight"
      overlay={(
        <Menu>
          <Menu.Item>
            <a onClick={onDelete} >删除</a>
          </Menu.Item>
        </Menu>
      )}>
      <Icon type="down" size={20} style={{cursor: 'pointer'}} />
    </Dropdown>
  </div>
);

const FooterItem = ({icon, onClick, title}) => (
  <a className="StatusItem-footerItem" onClick={onClick}>
    <div className="wrapper">
      <IconFont icon={icon} />
      <span>{title}</span>
    </div>
  </a>
);
