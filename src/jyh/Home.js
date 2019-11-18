import React, { Component } from 'react'
import './Home.css'
import {Link,Route,withRouter}  from "react-router-dom"
import 'element-theme-default';
import Home from './Home'
import One from './one'
import Citys from '../hyf/Ciyts'
import Login from '../zsd/login'
import Search from '../zsd/search'
// import Two from './two'
// import Three from './three'
// import Four from './four'
export class home extends Component {
   constructor(props) {
       super(props)
     this.btnfn  = this.btnfn.bind(this);
       this.state = {
            
       }
       
   }
   btnfn = (a)=>{
    return (e)=>{
        this.refs.one.style.color="#333";
        this.refs.citys.style.color="#333";
        this.refs.login.style.color="#333";
        this.refs.search.style.color="#333";
        this.refs[a].style.color="#3190e8";
        this.props.history.push('/'+a);    
    }
    }
    componentDidUpdate(){
        console.log(this.props.location.pathname.replace('/',''))
        this.refs.one.style.color="#333";
        this.refs.citys.style.color="#333";
        this.refs.login.style.color="#333";
        this.refs.search.style.color="#333";
        // console.log(this.refs[a]);
        if(this.props.location.pathname.replace('/','')==""){
            this.refs.one.style.color="#3190e8";
        }else{
            this.refs[this.props.location.pathname.replace('/','')].style.color="#3190e8";
        }
       
    }
    componentDidMount(){
        console.log(this.props.location.pathname.replace('/',''))
        this.refs.one.style.color="#333";
        this.refs.citys.style.color="#333";
        this.refs.login.style.color="#333";
        this.refs.search.style.color="#333";
        // console.log(this.refs[a]);
        if(this.props.location.pathname.replace('/','')==""){
            this.refs.one.style.color="#3190e8";
        }else{
            this.refs[this.props.location.pathname.replace('/','')].style.color="#3190e8";
        }
      
    }
   

    render() {
        return (
            <div className="wrap">
                <section>
                <Route exact path="/" component={One} />
                <Route path="/one" component={One}  />
                <Route path="/citys" component={Citys}  />
                <Route path="/login" component={Login}  />
                <Route path="/search" component={Search}  />
                </section>
                <ul id="menu">
                    <li onClick={this.btnfn("one")}>
                    <span className="el-icon-star-on" ref="one"></span>
                    <p>外卖</p>
                    </li>
                    <li onClick={this.btnfn("citys")}>
                    <span className="el-icon-time" ref="citys"></span>
                    <p>城市</p>
                    </li>
                    <li onClick={this.btnfn("login")}>
                    <span className="el-icon-document" ref="login"></span>
                    <p>登录</p>
                    </li>
                    <li onClick={this.btnfn("search")}>
                    <span className="el-icon-setting" ref="search"></span>
                    <p>搜索</p>
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(home)
