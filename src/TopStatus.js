import React, { Component } from "react";
import {
  UserCard,
  StatusItem,
  WriteStatusCard
} from "./components";
import { Affix, Calendar } from 'antd';
import "./TopStatus.css";


export default function TopStatus(props) {
  return(
    <div className="TopStatus">
      <div className="TopStatus-container">
        <div className="GlobalSideBar TopStatus-leftColumn">
          <Affix offsetTop={60}>
            <StatusCategories />
            <DividingLine />
            <FriendLinks />
            <YellowPages />
          </Affix>
        </div>
        <div className="TopStatus-mainColumn">
          <WriteStatusCard />
          <div className="statusList">
            <StatusItem/>
            <StatusItem/>
            <StatusItem/>
            <StatusItem/>
          </div>
        </div>
        <div className="GlobalSideBar TopStatus-rightColumn">
          <UserCard />
          <CalendarCard />
        </div>
      </div>
    </div>
  );
}


const CalendarCard = () => (
  <div className="Card">
    <Calendar fullscreen={false} />
  </div>
);

const LeftRow = ({href, children}) => (
  <a href={href} className="TopStatus-leftColumn-row">
    { children }
  </a>
);

const DividingLine = () => (
  <div className="dividing-line">
    <fieldset></fieldset>
  </div>
);

const Dot = () => (
  <span className="dot">
  </span>
);

const StatusCategories = () => (
  <div>
    <LeftRow href="#">
      <span className="boldItem">首页</span>
    </LeftRow>
    <LeftRow href="#">
      <span className="boldItem">今日热点</span>
    </LeftRow>
    <LeftRow href="#">
      <span className="boldItem">我的收藏</span>
    </LeftRow>
  </div>
);

const FriendLinks = () => (
  <div>
    <LeftRow href="//buaabt.cn">
      <Dot />
      <span>未来花园论坛</span>
    </LeftRow>
    <LeftRow href="//i.buaa.edu.cn">
      <Dot />
      <span>ihome社区</span>
    </LeftRow>
  </div>
);

const YellowPages = () => (
  <div>
    <LeftRow herf="#">
      <Dot />
      <span>北航黄页</span>
    </LeftRow>
  </div>
);
