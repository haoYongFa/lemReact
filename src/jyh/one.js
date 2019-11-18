import React, { Component } from 'react'
import "./one.css"
import Swiper from "swiper"
import {Link,Route,Switch,Redirect,withRouter} from 'react-router-dom'
// import Login from '../zsd/login'
import "../../node_modules/swiper/css/swiper.min.css"
export class one extends Component {
    constructor(props) {
        super(props)
     this.toto=this.toto.bind(this);
     this.toto1=this.toto1.bind(this);
        this.state = {
            dataArr1:[],
            dataArr:[],
            text:"外卖"
        }
    }
    toto(){
         this.props.history.push('/login');
    }
    toto1(){
        this.props.history.push('/search');
   }
    componentWillMount(){
        // fetch网络请求
      fetch("https://elm.cangdu.org/v2/index_entry",{method:"get"}).then(
          res=>{
          return res.json();
          }
      ).then(
          data=>{
            //   网络请求到的数据
              console.log(data);
              //处理一下数据，8个元素作为一个数组元素
              for(let i = 0;i < data.length / 8;i++){
                //  数组分割  参数1下标开始获取到参数2结束的下标位置（不包括该下标对应的数组元素）
                let subArr = data.slice(i*8,(i + 1) * 8);
                console.log(subArr);
                this.setState((previousState) =>  {
                    return {
                     dataArr:[...previousState.dataArr,subArr]
                    }
                 },()=>{
     
                 })
                   }
     
                   console.log(this.state.dataArr);
               }
           ).catch();


           fetch("https://elm.cangdu.org/shopping/restaurants?latitude=31.22967&longitude=121.4762",
           {method:"get"}).then(
            res=>{
            return res.json();
            }
        ).then(
            data=>{
              //   网络请求到的数据
                console.log(data);
                this.setState((previousState) => {
                    return{
                        dataArr1:data
                    }
                },()=>{
                })
                     console.log(this.state.dataArr1);
                 }
             ).catch();
         }
         componentDidUpdate(){
            new Swiper ('.swiper-container', {
                // direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项
                
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                },
                
                // 如果需要前进后退按钮
              //   navigation: {
              //     nextEl: '.swiper-button-next',
              //     prevEl: '.swiper-button-prev',
              //   }
              })  
        }

    render() {
        return (
            <div id="all" style={{textAlign:'left'}}>
                <div id="header">
                   <span className="el-icon-search" onClick={this.toto1}></span>
                   <span >郑州中心广场</span>
                   <span onClick={this.toto}>登录/注册</span>
                </div>
                <div className="swiper-container">
    <div className="swiper-wrapper">
        {
            this.state.dataArr.map((v,i)=>{
                return <div className="swiper-slide" key={i}>
                    {
                        v.map((v1,i1)=>{
                            return <div id="lis" key={i1}>
                                <img id="imgs" src={'https://fuss10.elemecdn.com' + v1.image_url} key={i1} />
                        <p id="text">{v1.title}</p>
                            </div>
                        })
                    }
                    </div>
            })
        }
    </div>

    <div className="swiper-pagination"></div>
</div>
    <div id="bottom">
        <p id="shoptext"><span className="el-icon-menu"></span>附近商家</p>
        {
            this.state.dataArr1.map((v,i)=>{
                return <div id="shop">
                <img src={"http://elm.cangdu.org/img/"+v.image_path} alt=""/>
                <p id="shop_zero"><span>品牌</span><span>{v.name}</span><span>保准票</span></p>
                <div id="shop_one">
                    <span>1 1 1 1 1</span> 
            <span>{v.rating}</span>
            <span>月售{v.recent_order_num}单</span>
                    <span>蜂鸟专送</span>
                    <span>准时达</span>
                </div>
                <div id="shop_two">
            <span>￥{v.float_minimum_order_amount}起送/</span>
                    <span> {v.piecewise_agent_fee.tips}</span>
                    <span>{v.distance}/</span>
            <span>{v.order_lead_time}</span>
                </div>
      </div>
            })
        }
       
        <div id="wall"></div>

    </div>   
            </div>
        )
    }
    // componentDidMount(){
    //     new Swiper ('.swiper-container', {
    //           // direction: 'vertical', // 垂直切换选项
    //           loop: true, // 循环模式选项
              
    //           // 如果需要分页器
    //           pagination: {
    //             el: '.swiper-pagination',
    //           },
              
    //           // 如果需要前进后退按钮
    //         //   navigation: {
    //         //     nextEl: '.swiper-button-next',
    //         //     prevEl: '.swiper-button-prev',
    //         //   }
    //         })  
    //   }
}

export default withRouter(one)
