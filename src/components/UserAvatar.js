import React, { Component } from "react";
import "./UserAvatar.css";

export default function UserAvatar(props) {
  const size = props.size || 30;
  const nickname = props.nickname || "张三";
  const src = "//tvax3.sinaimg.cn/crop.0.0.664.664.180/0070O95Yly8fwaokeu0v5j30ig0igdgk.jpg";
  return (
    <img className="UserAvatar" src={src} width={size} height={size} />
  );
}
