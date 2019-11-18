import React, { Component } from 'react'
import {Link,Route,withRouter} from 'react-router-dom'
import "./City.css"
import 'element-theme-default'
export class Ciyts extends Component {
    constructor(props) {
        super(props)
            this.toProfile = this.toProfile.bind(this)
        this.state = {
             curcity:"",
             hotcity:[],
             allcity:[],
        }
    }
    componentWillMount(){
        this.getCurcity();
        this.getHotcity();
        this.getAllcity();
    }
    // 获取定位城市
    getCurcity(){
        fetch('https://elm.cangdu.org/v1/cities?type=guess',{method:"get"}).then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            this.setState({
                curcity:data.name
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    // 获取热门城市
    getHotcity(){
        fetch('https://elm.cangdu.org/v1/cities?type=hot',{method:"get"}).then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            this.setState({
                hotcity:data
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    // 获取所有城市
    getAllcity(){
        fetch('https://elm.cangdu.org/v1/cities?type=group',{method:"get"}).then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            for(var i in data){
                const arr = [];
                arr.push(i);
                for(var j in data[i]){
                    arr.push(data[i][j]);
                }
                this.setState({
                    allcity:[...this.state.allcity,arr]
                })
                // this.allcity.push(arr);
            };
            
            this.setState({
                allcity:this.state.allcity.sort()
            })
            console.log(this.state.allcity)
            // this.setState({
            //     allcity:data
            // })
        }).catch((err)=>{
            console.log(err);
        })
    }
    toProfile(){
        this.props.history.push("/login")
    }
        render() {
        return (
            <div className="citys"  style={{textAlign:'left'}}>
                <div id="tops">
                    <span>城市列表</span><span onClick={this.toProfile} className="iconfont">&#xe607;</span>
                </div>
                <div id="current_city">
                    <span>当前定位城市：</span><span>定位不准时，请在城市列表中选择</span>
                </div>
                <div id="cur_ty">
                    <span>{this.state.curcity}</span><span className="el-icon-arrow-right"></span>
                </div>
                <div id="hot">
                    <p>热门城市</p>
                    <ul>
                        {
                            this.state.hotcity.map((v,i)=>{
                            return <li key={i}>{v.name}</li>
                            })
                        }
                    </ul>
                </div>
      {/* <!-- 全部城市 --> */}
                <div>
                    {
                        this.state.allcity.map((v,i)=>{
                        return <div key={i} className="allcity">
                                <p>
                                    {v[0][0]}
                                    {/* <span v-show="v[0] == 'A'" style="font-size: 0.1rem;color: #999999;">(按字母排序)</span> */}
                                </p>
                                <ul>
                                {
                                    v.map((m,j)=>{
                                        return <li key={j} style={{display:m.name ? "block" : "none"}}>{m.name}</li>
                                    })
                                }
                                </ul>
                            </div>
                        })
                    }
                    
                </div>
            </div>
        )
    }
}

export default withRouter(Ciyts)
