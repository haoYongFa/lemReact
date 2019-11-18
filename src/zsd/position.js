import React, { Component } from 'react'
import "./position.css"
import 'element-theme-default'
import {Link,Route,Switch,Redirect,withRouter} from 'react-router-dom'
export class position extends Component {
constructor(props) {
    super(props)
    this.state = { 
        hot:[],//热门城市
        details:[],//所有城市
    }
    this.getRequest=this.getRequest.bind(this);
    this.getRequestcity = this.getRequestcity.bind(this);
    this.jumpto1 = this.jumpto1.bind(this);
    this.jumpsearch = this.jumpsearch.bind(this);
}
//路由跳转函数
jumpto1(){
    this.props.history.push("/login")
}
jumpsearch(){
    this.props.history.push("/search")
}
// 请求热门城市
getRequest(){
fetch(
    "https://elm.cangdu.org/v1/cities?type=hot",
    {method:"get"}
).then((res)=>{
    return res.json();
}).then((data)=>{
    this.setState({
        hot:data
    })
    // console.log(this.state.hot)
}).catch((err)=>{
});
}
//请求所有城市
getRequestcity(){
    fetch(
        "https://elm.cangdu.org/v1/cities?type=group",
        {method:"get"}
    ).then((res)=>{
        return res.json();
    }).then((data)=>{
        // this.setState({
        //     details:data
        // })
        console.log(data);
    for (var i in data){
        var arr = [];
        arr.push(i);
        console.log(arr);
    for (var j in data[i]){
            arr.push(data[i][j]);
        }
       this.setState({
           details:[...this.state.details,arr]
       })
    }
    console.log(this.state.details.sort());
    this.setState({
        details:this.state.details.sort()
    })
    console.log(this.state.details);
    // console.log(this.data.sort());
    }).catch((err)=>{
    });
    
    }
    // 钩子函数
componentWillMount() {
    this.getRequest();
    this.getRequestcity();
}
    render() {
        return (
            <div className="wrap">
                <ul>
                    {/* 头部 */ }
                    <li className="header">
                        <span onClick={this.jumpsearch} className="header_left">
                            ele.me
                        </span>
                        <span  onClick={this.jumpto1} className="iconfont header_right">
                        &#xe607;
                        </span>
                    </li>
                    <li className="guesscity_first">
                        <span className="guesscity_left" >当前定位城市:</span>
                        <span className="guesscity_right" >定位不准时,请在城市列表中选择</span>
                    </li>
                    <li className="guess">
                        <span className="guess_left">北京</span>
                        <span id="guess_right" class="el-icon-arrow-right"></span>
                    </li>
                    <li className="hotCity">
                        <span  id="hot">热门城市</span>
                    </li>
                </ul>
                {/* 热门城市 */}
                <ul  id="cities">
                   {
                       this.state.hot.map((v,i)=>{
                       return <li key={i}>{v.name}</li>
                       })
                   }
                </ul>
                {
                 this.state.details.map((v,i)=>{
                 return  <ul id="exactcity">
                {/* 城市详情 */}
                <p  id="A"> 
                {v[0]}
                <span style={{display:v[0] =="A" ? "block" : "none"}}>(按字母排序)</span>
                </p>
                <li id="a_city">
                {
                v.map((m,j)=>{
                    return <span style={{display:m.name ? "block" :"none"} }key={j}> {m.name} </span>
                })
                }
                  </li>
                </ul>
                })
                }
            </div>
        )
    }
}

export default withRouter(position)
