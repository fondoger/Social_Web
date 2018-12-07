import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { UserAvatar } from './components';
import './AppHeader.css';
import { Icon, Button, Popover, Dropdown } from "antd";

export default class AppHeader extends Component {
  render() {
    return (
      <header role="banner" className="AppHeader">
        <div className="AppHeader-inner">
          <a href="//www.zhihu.com" aria-label="BUAA">
            <h className="AppHeader-logo">BUAA</h>
          </a>
          <nav role="navigation" class="AppHeader-nav">
            <NavLink className="AppHeader-navItem"
              activeClassName="is-active"
              to="/">首页</NavLink>
            <NavLink className="AppHeader-navItem"
              activeClassName="is-active"
              to="/sale/">二手</NavLink>
            <NavLink className="AppHeader-navItem"
              activeClassName="is-active"
              to="/news/">新闻</NavLink>
          </nav>
          <div className="AppHeader-userInfo">
            <DownloadApp />
            <Notifications />
            <Messages />
            <UserAvatar size={32} nickname="我" />
          </div>
        </div>
      </header>
    );
  }
}

const DownloadApp = () => (
  <a style={{marginRight: 30}} href="#" >下载APP</a>
);

const Notifications = ({}) => (
  <div className="popover">
    <a onClick={()=>console.log("Click notifications")}>
      <Icon type="bell" theme="filled"/>
    </a>
  </div>
);

const Messages = ({}) => (
  <div className="popover">
    <a onClick={()=>console.log("Click notifications")}>
      <Icon type="mail" theme="filled"/>
    </a>
  </div>
);
