import React, { Component } from "react";

export default function IconFont(props) {
  const style = props.style || {};
  if (props.size) {
    style.fontSize = props.size;
  }
  if (props.color) {
    style.color = props.color;
  }
  const color = "";
  return (
    <svg style={style} className={`iconfont ${props.className}`} aria-hidden="true">
      <use xlinkHref={props.icon}></use>
    </svg>
  );
}
