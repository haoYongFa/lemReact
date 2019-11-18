import {Link,Route,Switch,Redirect,withRouter} from 'react-router-dom'
import React, { Component } from 'react'
import "./login.css"

export class login extends Component {
constructor(props) {
    super(props)
    this.postRequest = this.postRequest.bind(this);
    this.log = this.log.bind(this);
    this.txtChange = this.txtChange.bind(this);
    this.txtChange2 = this.txtChange2.bind(this);
    this.txtChange3 = this.txtChange3.bind(this);
    this.jump3 = this.jump3.bind(this);
    this.state = {
        code:"",
        username:"",
        password:"",
        captcha_code:""
    }
}
//路由跳转函数
jump3(){
    this.props.history.push("/one")
}
//钩子函数
componentWillMount(){
   this.postRequest();
}

//双向数据绑定
txtChange = (e)=>{
    const mydata = e.target.value
    this.setState({
        username: mydata
    })
    console.log(this.state.username)
}
txtChange2 = (f)=>{
    const password = f.target.value
    this.setState({
        password: password
    })
    console.log(this.state.password)
}
txtChange3 = (g)=>{
    const captcha_code = g.target.value
    this.setState({
        captcha_code: captcha_code
    })
    console.log(this.state.captcha_code)
}
// postRequest函数 验证码的post请求
postRequest(){
    fetch("https://elm.cangdu.org/v1/captchas",{
    credentials:"include",
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        this.setState({
        code:data.code
        })
        console.log(this.state.code);
    }).catch((err)=>{
        console.log(err);
    })
}
//登录界面的post请求
log(){
    fetch("https://elm.cangdu.org/v2/login",{
    method:'POST',
    credentials:"include",
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        username:this.state.username,
        password:this.state.password,
        captcha_code:this.state.captcha_code
    })
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })

}
    render() {
        return (
            <div>
                 <ul>
                    {/* 头部 */ }
                    <li className="header">
                        <span onClick={this.jump3} className="header_left">
                            back
                        </span>
                        <span  className="iconfont header_right">
                        注册
                        </span>
                    </li>
                    {/* 登录注册 */}
                    <li>
                    <input id="count" onChange={ (e)=>this.txtChange(e) } placeholder="账号"></input>
                    </li>
                    <li>
                        <input onChange={ (f)=>this.txtChange2(f) }  id="passward" placeholder="密码"></input>
                    </li>
                    <li id="verify">
                        <input onChange={ (g)=>this.txtChange3(g) } id="input" placeholder="验证码"></input>
                        <img id="verify_img"  src={this.state.code}></img>
                        <span onClick={this.postRequest} id="remark">看不清</span>
                        <span onClick={this.postRequest} id="change">换一张</span>
                    </li>
                    <li>
                        <p id="hint1">温馨提示:未注册的账号登陆时将自动注册</p>
                        <p id="hint2">注册过的用户可凭账号直接登录</p>
                    </li>
                    <li>
                        <button onClick={this.log} id="logButton">登录</button>
                    </li>
                    <li id="reset">
                        <p id="reset_p">重置密码？</p>
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(login) 
