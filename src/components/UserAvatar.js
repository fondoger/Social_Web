import React, { Component } from "react";
import { Avatar } from "antd";
import "./UserAvatar.css";

export default function UserAvatar(props) {
  const size = props.size || 30;
  const nickname = props.nickname || "张三";
  const src = "//tvax3.sinaimg.cn/crop.0.0.664.664.180/0070O95Yly8fwaokeu0v5j30ig0igdgk.jpg";
  const style = props.style;
  return (
    <Avatar style={props.style} src={src} size={size} />
  );
}
