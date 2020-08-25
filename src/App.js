import React, { Component } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Signup from './components/auth/SignUp';
import Login from './components/auth/Login';
import Home from './components/home/Home'
import Profile from './components/profile/Profile';
import Logout from './components/auth/Logout';
import Search from './components/search/Search';
import Footer from './components/profile/Profile';
import Details from './components/recipes/Details'
import AddRecipe from './components/addRecipe/AddRecipe';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null,
    }
  }


  getTheUser = (userObject) => {//faz a comunicação entre comp. pais e filhos
    this.setState({
      loggedInUser: userObject
    }, () => {
      localStorage.setItem('loggedInUser', JSON.stringify(this.state.loggedInUser))
    })
  }

  getAllRecipe = (recipesObject) => {
    this.setState({
      recipes: recipesObject
    })
    console.log('get recipes', recipesObject)

  }


  getSelectedIngredients = (list) => {
    this.setState({
      ingredients: list
    })
  }


  render() {
    console.log('in app:', this.state)
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/signup" render={props => <Signup {...props} getUser={this.getTheUser} />} />
          <Route path="/login" render={props => <Login {...props} getUser={this.getTheUser} />} />
          <Route path="/logout" render={props => <Logout {...props} getUser={this.getTheUser} />} />
          <Route path="/profile" render={props => <Profile {...props} user={this.state.loggedInUser} getUser={this.getTheUser} />} />
          <Route path="/footer" render={props => <Footer {...props} user={this.state.loggedInUser} />} />
          <Route path="/search" render={props => <Search {...props} user={this.state.loggedInUser} liftUpRecipesSearched={this.getAllRecipe} ingredients={this.getSelectedIngredients} />} />
          <Route path="/recipe/:id" render={props => <Details {...props} recipe={this.state.recipes} />} />
          <Route path="/add" render={props => <AddRecipe {...props} user={this.state.loggedInUser} />} />
        </Switch>
      </div>
    )
  }
}
