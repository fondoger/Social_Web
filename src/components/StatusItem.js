import React, { Component } from "react";
import IconFont from "./IconFont";
import UserAvatar from "./UserAvatar";
import { Dropdown, Icon, Menu, Form, Button, Input, Comment, List, Avatar } from "antd";
import "./StatusItem.css";

const status = {
    user: {
        id: 3330,
        username: "OhMyGakki",
        self_intro: "游走在即将挂科的边缘",
    },
    text: "今天真的好开心啊，哈哈哈",
    likes: 12,
    replies: 8,
    comments: [
      {
        user: {
          id: 3331,
          username: 'good',
        },
        text: '你真棒',
        timestamp: "12月5日 23:30",
      },
      {
        user: {
          id: 3331,
          username: 'good',
        },
        text: '你真棒',
        timestamp: "12月5日 23:30",
      },
    ],
    timestamp: "12月5日 23:30",
};

export default class StatusItem extends React.Component {
  state = {
    showComments: false,
    commentValue: "",
  };
  render() {
    const { showComments, commentValue } = this.state;
    return (
      <div className="Card StatusItem">
        <div className="StatusItem-wrapper">
          <div className="StatusItem-leftColumn" >
            <UserAvatar size={50} />
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
        { this.renderStatusFooter(status) }
        { showComments ?
          <StatusComments
            status={status}
            value={commentValue}
            onChange={(e)=>this.setState({commentValue: e.target.value})}
            onSubmit={()=>alert(commentValue)}
          /> : null
        }
      </div>
    );
  }


  handleCommentOnPress = () => {
    this.setState({showComments: !this.state.showComments});
  }

  renderStatusFooter(status) {
    return (
      <div className="StatusItem-footer">
        <a className="StatusItem-footerItem">
          <div className="wrapper">
            <IconFont icon="#icon-shoucang" />
            <span>收藏</span>
          </div>
        </a>
        <a className="StatusItem-footerItem">
          <div className="wrapper">
            <IconFont icon="#icon-zhuanfa2" />
            <span>转发</span>
          </div>
        </a>
        <a
          className="StatusItem-footerItem"
          onClick={this.handleCommentOnPress}
        >
          <div className="wrapper">
            <IconFont icon="#icon-pinglun" />
            <span>评论</span>
          </div>
        </a>
        <a className="StatusItem-footerItem">
          <div className="wrapper">
            <IconFont icon="#icon-dianzan2" />
            <span>点赞</span>
          </div>
        </a>
      </div>
    );
  }
}


const StatusContent = ({status}) => (
  <div className="StatusItem-content">
    <p style={{marginBottom: 0, color: '#444'}}>{status.text}</p>
  </div>
);

const UserInfo = ({status}) => {
  const user = status.user;
  return (
    <div className="StatusItem-userInfo">
      <div className="wrapper">
        <a className="username">{user.username}</a>
        <span className="self_intro"> {user.self_intro}</span>
      </div>
      <span className="timestamp">{status.timestamp}</span>
      <span className="timestamp"> 来自 goodbuaa.com</span>
    </div>
  );
}



const CommentList = ({status}) => (
  <List
    className="comment-list"
    header={`共${status.replies}条评论` }
    dataSource={status.comments}
    itemLayout="horizontal"
    renderItem={item =>
      <Comment
        avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        author={item.user.username}
        datetime={<span>{item.timestamp}</span>}
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

const StatusComments = ({status, user, value, onChange, onSubmit }) => (
  <div className="StatusComments">
    <CommentList status={status}/>
    <Comment
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
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
