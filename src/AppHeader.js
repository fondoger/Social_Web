import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { UserAvatar, IconFont } from './components';
import MyStorage from "./utils/MyStorage";
import './AppHeader.css';
import { Icon, Button, Popover, Dropdown, Menu } from "antd";


export default class AppHeader extends Component {
  render() {
    return (
      <header role="banner" className="AppHeader">
        <div className="AppHeader-inner">
          <a href="/" aria-label="BUAA">
            <IconFont className="AppHeader-logo" icon="#icon-BUAA" />
          </a>
          <nav role="navigation" className="AppHeader-nav">
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
            <UserInfoDropDown />
          </div>
        </div>
      </header>
    );
  }
}

const DownloadApp = () => (
  <a style={{marginRight: 30, color: "#1890ff"}} href="#" >下载APP</a>
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

const DropDownItem = ({icon, onClick, title, href}) => (
  <a href={href} onClick={onClick} className="AppHeader-DropDownItem">
    <Icon type={icon} style={{marginRight: 4}} />
    <span >{title}</span>
  </a>
);
const UserInfoDropDown = ({status, onDelete}) => (
  <div>
    <Popover
      trigger="click"
      placement="bottom"
      overlayStyle={{padding: -30}}
      overlayClassName="AppHeader-Dropdown"
      content={(
        <div>
          <DropDownItem icon="user" title="我的主页" href="/"/>
          <DropDownItem icon="setting" title="设置" href="#" />
          <DropDownItem icon="logout" title="退出" href="#" onClick={handleLogout}/>
        </div>
      )}>
      <div>
        <UserAvatar size={32} user={MyStorage.user} />
      </div>
    </Popover>
  </div>
);

const handleLogout = () => {
  MyStorage.setItem("user", null);
  MyStorage.setItem("token", null);
  window.location.reload();
};