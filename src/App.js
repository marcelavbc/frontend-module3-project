import React, { Component } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Signup from './components/auth/SignUp';
import Login from './components/auth/Login';
import Home from './components/home/Home'
import Profile from './components/profile/Profile';
import Logout from './components/auth/Logout';
import ProfileEdit from './components/profile/ProfileEdit';
import Search from './components/search/Search';
import Footer from './components/profile/Profile';
import Details from './components/recipes/Details'


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
  }

  getSelectedIngredients = (list) => {
    this.setState({
      ingredients: list
    })
  }

  // getSingleRecipe = (id) => {
  //   // let recipeDetail = this.state.recipes.find(ele => {
  //   //   console.log('ele', ele)
  //   //   console.log('ele', ele.title)
  //   //   return ele.id = id}) 
  //   console.log('id', id)
  //   // console.log('recipeDetail', recipeDetail)

  //   this.setState({
  //     singleRecipe: id
  //   })
  //   console.log("app.state.singleRecipe", this.state.singleRecipe)

  // }



  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/signup" render={props => <Signup {...props} getUser={this.getTheUser} />} />
          <Route path="/login" render={props => <Login {...props} getUser={this.getTheUser} />} />
          <Route path="/logout" render={props => <Logout {...props} getUser={this.getTheUser} />} />
          <Route path="/profile" render={props => <Profile {...props} user={this.state.loggedInUser} />} />
          <Route path="/edit" render={props => <ProfileEdit {...props} user={this.state.loggedInUser} getUser={this.getTheUser} />} />
          <Route path="/footer" render={props => <Footer {...props} user={this.state.loggedInUser} />} />
          <Route path="/search" render={props => <Search {...props} user={this.state.loggedInUser} liftUpRecipesSearched={this.getAllRecipe} ingredients={this.getSelectedIngredients} getSingleRecipe={this.getSingleRecipe}/>} />
          <Route path="/recipe/:id" render={props => <Details {...props}  recipes={this.state.recipes } getSingleRecipe={this.getSingleRecipe} single={this.state.singleRecipe}/>} />
        </Switch>
      </div>
    )
  }
}
