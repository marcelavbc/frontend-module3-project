import React, { Component } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Signup from './components/auth/SignUp';
import Login from './components/auth/Login';
import Home from './components/home/Home'
import Profile from './components/profile/Profile';
import Footer from './components/profile/Profile';
import Search from './components/search/Search';




export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null
    }
  }


  // getTheParam = (param) => {
  //   this.setState({
  //     param: param
  //   })

  // }

  getTheUser = (userObject) => {//faz a comunicação entre comp. pais e filhos
    this.setState({
      loggedInUser: userObject
    }, () => {
      localStorage.setItem('loggedInUser', JSON.stringify(this.state.loggedInUser))
    })
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/signup" render={props => <Signup {...props} getUser={this.getTheUser} />} />
          <Route path="/login" render={props => <Login {...props} getUser={this.getTheUser} />} />
          <Route exact path="/profile" render={props => <Profile {...props} user={this.state.loggedInUser} />} />
          <Route path="/footer" render={props => <Footer {...props} user={this.state.loggedInUser} />} />
          <Route path="/search" render={props => <Search {...props} user={this.state.loggedInUser} getTheParam={this.getTheParam}/>} />
        </Switch>

      </div>
    )
  }
}
