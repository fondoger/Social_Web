import React, { Component } from "react";
import "./WriteStatusCard.css";


export default function WriteStatusCard(props) {
  return (
    <div className="Card WriteStatusCard">
      <div className="WriteStatusCard-title">
        <span>有什么新鲜事想告诉大家？</span>
      </div>
      <div className="WriteStatusCard-input">
        <textarea >
        </textarea>
      </div>
      <div className="WriteStatusCard-footer">
        <div className="wrapper">
          <button type="button" class="Button">发布
          </button>
        </div>
      </div>
    </div>
  );
}
