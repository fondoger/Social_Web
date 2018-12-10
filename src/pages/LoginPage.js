import React, { Component } from 'react';
import { IconFont } from '../components';
import { Input, Button, message } from "antd";
import { Redirect } from 'react-router-dom';
import API from '../utils/API_v1';
import MyStorage from '../utils/MyStorage';
import "./LoginPage.css";

export default class LoginPage extends Component {
    state = { login: false };
    render() {
        const login = this.state.login;
        return (
            <div className="SignFlowHomePage">
                <div className="App-main">
                    <div className="Card SignContainer">
                        { login ? <Login />: <Register />}
                        <div className="SignSwitcher">
                            <span>{login ? "没": "已"}有账号？</span>
                            <a onClick={this.switch}>{login ? "注册": "登陆"}</a>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
    switch = () => {
        this.setState({login: !this.state.login});
    }
}


const Register = () => (
    <div style={{padding: 20}}>
        <IconFont style={{width: 140, height: 60, margin: 8 }} icon="#icon-BUAA" />
        <span style={{display: "block", fontSize: 20, color: "#0084ff"}}>注册BUAA，分享你的校园生活</span>
        <div style={{padding: 20}}>
            <MyInput placeholder="输入您的账号"/>
            <MyInput type="password" placeholder="输入您的密码"/>
            <div style={{marginTop: 8, height: 20, textAlign: "right", fontSize: 14, color: "#888"}}>
            </div>
            <Button type="primary" block className="SignButton">注册</Button>
        </div>
    </div>
);

const MyInput = (props) => (
    <div className="SignInputContainer">
        <Input className="SignInput"
            {...props} />
    </div>
);


class Login extends Component {
    state = { 
        email: "",
        password: "",
        loading: false,  
    }
    render() {
        const { loading, password, email, logged_in } = this.state;
        return (
            <div style={{padding: 20}}>
                <IconFont style={{width: 140, height: 60, margin: 8 }} icon="#icon-BUAA" />
                <h style={{display: "block", fontSize: 20, color: "#0084ff"}}>登陆BUAA，分享你的校园生活</h>
                <div style={{padding: 20}}>
                    <MyInput 
                        value={email}
                        placeholder="输入您的账号"
                        onChange={(e)=>this.setState({email: e.target.value})}
                    />
                    <MyInput 
                        value={password} 
                        type="password" 
                        placeholder="输入您的密码"
                        onChange={(e=>this.setState({password: e.target.value}))}
                    />
                    <div style={{marginTop: 8, textAlign: "right", fontSize: 14, color: "#888"}}>
                        <a>忘记密码？</a>
                    </div>
                    <Button 
                        loading={loading} 
                        type="primary"
                        block className="SignButton"
                        onClick={this.onLoginPress}
                    >登陆</Button>
                </div>
            </div>
        );
    }
    onLoginPress = () => {
        const { password, email, loading } = this.state;
        if (email === '') {
            message.warning("请输入账号");
            return;
        }
        else if (password == '') {
            message.warning("请输入密码");
            return;
        }
        if (loading)
          return
        this.setState({ loading: true });
        API.Other.token(email, password, (responseJson) => {
          message.success('登陆成功');
          const { token, user } = responseJson;
          MyStorage.setItem("token", token);
          MyStorage.setItem("user", user);
          this.setState({ loading: false });
          window.location.reload();
        }, (error) => {
          if (error.message && error.message === 'Invalid credentials')
            message.warning('账号或密码错误');
          else
            message.warning('登陆失败' + error);
          this.setState({ loading: false });
        });
    }
}
