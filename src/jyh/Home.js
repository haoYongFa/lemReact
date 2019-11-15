import React, { Component } from 'react'
import './Home.css'
import {Link,Route,withRouter}  from "react-router-dom"
import 'element-theme-default';
import Home from './Home'
import One from './one'
import Two from './two'
import Three from './three'
import Four from './four'
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
        this.refs.two.style.color="#333";
        this.refs.three.style.color="#333";
        this.refs.four.style.color="#333";
        // console.log(this.refs[a]);
        this.refs[a].style.color="#3190e8";
        this.props.history.push('/'+a)
    }
    }
    componentDidUpdate(){
        console.log(this.props.location.pathname.replace('/',''))
        this.refs.one.style.color="#333";
        this.refs.two.style.color="#333";
        this.refs.three.style.color="#333";
        this.refs.four.style.color="#333";
        // console.log(this.refs[a]);
        this.refs[this.props.location.pathname.replace('/','')].style.color="#3190e8";
    }
   

    render() {
        return (
            <div className="wrap">
                <section>
                <Route exact path="/" component={One} />
                <Route path="/one" component={One}  />
                <Route path="/two" component={Two}  />
                <Route path="/three" component={Three}  />
                <Route path="/four" component={Four}  />
                </section>
                <ul id="menu">
                    <li onClick={this.btnfn("one")}>
                    <span className="el-icon-star-on" ref="one" style={{color:"#3190e8"}}></span>
                    <p>外卖</p>
                    </li>
                    <li onClick={this.btnfn("two")}>
                    <span className="el-icon-time" ref="two"></span>
                    <p>搜索</p>
                    </li>
                    <li onClick={this.btnfn("three")}>
                    <span className="el-icon-document" ref="three"></span>
                    <p>订单</p>
                    </li>
                    <li onClick={this.btnfn("four")}>
                    <span className="el-icon-setting" ref="four"></span>
                    <p>我的</p>
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(home)
