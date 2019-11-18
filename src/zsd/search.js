import React, { Component } from 'react'
import 'element-theme-default'
import "./search.css"
import  cookie from 'react-cookies'
import {Link,Route,Switch,Redirect,withRouter} from 'react-router-dom'
export class search extends Component {
constructor(props) {
    super(props)
    this.getCities = this.getCities.bind(this)
    this.txtChange = this.txtChange.bind(this)
    this.getOne = this.getOne.bind(this)
    this.deleteAll = this.deleteAll.bind(this)
    this.jumpto2 = this.jumpto2.bind(this)
    this.state = {
        mydata:"",
        web1:"https://elm.cangdu.org/v1/pois?city_id=1&keyword=",
        web2:"&type=search",
        cityarr:[],
        userId:[],
    }
}
//路由跳转的函数
jumpto2(){
    this.props.history.push("/search")
}
// 钩子函数
componentWillMount(){
    // this.getCities();
}
submit = ()=>{
   
　　　　///删除cookie
　　　　///cookie.remove('userId');
};
//清空历史记录
deleteAll(){
    this.setState({
        userId : []
    })
    console.log("惦记了");
}

//获取一个城市到输入框
getOne(x){
    this.setState({
        mydata:this.state.cityarr[x].name
    })
    cookie.save('userId', this.state.cityarr[x].name);
    console.log(cookie.load('userId'));
    this.setState({
})
}
//获取城市列表
getCities(){
    if(this.state.mydata){
    fetch(
        this.state.web1+this.state.mydata+this.state.web2,
        {method:"get"}
    ).then((res)=>{
        return res.json();
    }).then((data)=>{
        this.setState({
            cityarr:data,
            userId:[...this.state.userId,cookie.load('userId')]
        })
    }).catch((err)=>{
    });
} 
}
//双向数据绑定
txtChange = (e)=>{
    const newVal = e.target.value
    this.setState({
        mydata: newVal
    })
}
    render() {
        return (
            <div className="wrap">
                <ul>
                    {/* 头部 */ }
                    <li className="header">
                        <span className="header_left">
                            back
                        </span>
                    {/* 搜索 */}
                        <span onClick={this.jumpto2}  className="iconfont header_right">
                        搜索
                        </span>
                    </li>
                    <input id="inputadd" placeholder="请输入城市" onChange={ (e)=>this.txtChange(e) } type="text" value={this.state.mydata} />
                    <button onClick={this.getCities} id="submit">提交</button>
                    <li id="history">
                     <p id="history_p1">搜索历史</p>
                     <p id="history_p2">
                         <span id="history_p2_span1">{this.state.userId}</span>
                         <span id="history_p2_span2">*</span>
                     </p>
                     <p id="history_p3" onClick={this.deleteAll}>清空搜索历史</p>
                    </li>
                    <ul id="resultCity">
                    {
                     this.state.cityarr.map((v,i)=>{
                         //react的传值方法
                       return <li onClick={() => this.getOne(i)} key={i}> {v.name}
                       </li>
                       })
                    }
                  </ul>
                  
                </ul>

            </div>
        )
    }
}

export default withRouter(search)
