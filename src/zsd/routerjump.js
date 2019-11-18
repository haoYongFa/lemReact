import React, { Component } from 'react'
import Posi from './position'
import Search from './search'
import Login from './login'
import {Link,Route,Switch,Redirect,withRouter} from 'react-router-dom'
export class routerjump extends Component {
constructor(props) {
    super(props)

    this.state = {
         
    }
}
    render() {
        return (
            <div>
                <section>
                    <Route exact path="/" component={Posi}></Route>
                    <Route exact path="/position" component={Posi}></Route>
                    <Route path="/search" component={Search}></Route>
                    <Route path="/login" component={Login}></Route>
                </section>
            </div>
        )
    }
}

export default withRouter(routerjump)
