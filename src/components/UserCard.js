import React, { Component } from "react";
import UserAvatar from "./UserAvatar";
import "./UserCard.css";

export default function UserCard(props) {
  return (
    <div className="Card">
      <div className="UserCard">
        <div className="UserCard-cover">
          <div className="UserCard-avatar">
            <UserAvatar className="UserCard-avatar" size={60} />
          </div>
        </div>
        <div className="UserCard-info">
          <a href="zhihu.com">OhMyGakki</a>
        </div>
        <div className="UserCard-nav">
          <div className="UserCard-navItem">
            <strong>8</strong>
            <span>关注</span>
          </div>
          <div className="UserCard-navItem">
            <strong>2</strong>
            <span>粉丝</span>
          </div>
          <div className="UserCard-navItem">
            <strong>10</strong>
            <span>动态</span>
          </div>
        </div>
      </div>
    </div>
  );
}
