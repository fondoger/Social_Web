import React, { Component } from 'react';
import { Icon, Button, } from "antd";
import "./SaleItem.css";
import UserAvatar from './UserAvatar';

const user = {
    username: "OhMyGakki",
    self_intro: "今天真是美好的一天呐",
};

const item = {
    timestamp: "去年八月",
    user: user,
    price: 100,
    title: "闲置iphone5s出",
    text: "16G内存轻微划痕，前后贴膜，指纹灵敏 可注销，有需要的私聊"
};

export default function(props) {
    return (
        <div className="Card" style={{padding: 16, marginBottom: 0}}>
            <div>
                <ItemHeader item={item} />
                <ItemContent item={item} />
                <ItemFooter item={item} />
            </div>
        </div>
    );
}

const ItemHeader = ({item}) => (
    <div style={{display: "flex"}}>
        
        <UserAvatar style={{marginRight: 8}} size={40} />
        <div style={{flex: 1, textAlign: "left", }}>
            <div>
                <a style={{fontWeight: "bold", color: '#333'}}>{item.user.username}</a>
            </div>
            <span>{item.timestamp}</span>
        </div>
        <div style={{color: "#ff0036", fontWeight: "bold"}}>
            <span>¥</span>
            <span style={{fontSize: 22}}>{item.price}</span>
        </div>
    </div>
);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

const ItemContent = ({item}) => {
    const src = `https://picsum.photos/500/500/?image=${getRandomInt(500)}`;
    return (
        <div style={{textAlign: 'left', paddingTop: 12}}>
            <span style={{fontWeight: "bold", color: "#555"}}>{item.title}</span>
            <div style={{paddingTop: 8, paddingBottom: 12}}>
                <span>{item.text}</span>
            </div>
            <div style={{position: 'relative', paddingBottom: "80%", width: "100%", backgroundColor: '#ddd', borderRadius: 4, borderWidth: 1, borderColor: '#eee', borderStyle: "solid"}}>
                <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
                    <img style={{ borderRadius: 4, display: "block", width: "100%", height: "100%"}} src={src} />
                </div>
            </div>
        </div>
    );
};  

const ItemFooter = ({item}) => (
    <div style={{display: "flex", marginTop: 12}}>
        <Button icon="message">添加评论</Button>
        <div style={{flex: 1}} />
        <Button>
            <Icon theme="filled" style={{paddingTop:4, fontSize: 16, color:"#f5222d"}} type="heart" />
            我想要
        </Button>
    </div>
);