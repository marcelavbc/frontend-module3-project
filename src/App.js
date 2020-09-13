import React, { Component } from 'react'
import './App.css';
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import Signup from './components/auth/SignUp';
import Login from './components/auth/Login';
import Home from './components/home/Home'
import Profile from './components/profile/Profile';
import Logout from './components/auth/Logout';
import Search from './components/search/Search';
import Footer from './components/profile/Profile';
import RecipeDetails from './components/recipes/RecipeDetails'
import AddRecipe from './components/addRecipe/AddRecipe';
import FindUser from './components/users/FindUser';
import UsersProfile from './components/users/UsersProfile';
import MainPage from './components/main/MainPage';
import EditRecipe from './components/recipes/EditRecipe';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null,
    }
  }


  getTheUser = (userObject) => {
    this.setState({
      loggedInUser: userObject,
    }, () => {
      localStorage.setItem('loggedInUser', JSON.stringify(this.state.loggedInUser));
    })
  }

  showMyRecipes = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/profile/recipes`, { withCredentials: true })
      .then(response => {
        // console.log('my recipes:', response.data)
        this.setState({
          myRecipes: response.data
        })
      })
  }

  showSavedRecipes = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/profile/savedRecipes`, { withCredentials: true })
      .then(response => {
        this.setState({
          savedRecipes: response.data
        })
      })
  }


  getAllRecipe = (recipesObject) => {
    this.setState({
      recipes: recipesObject,
    })
  }


  getSelectedIngredients = (list) => {
    this.setState({
      ingredients: list
    })
  }


  render() {
    // console.log('in app:', this.state)
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/signup" render={props => <Signup {...props} getUser={this.getTheUser} />} />
          <Route path="/login" render={props => <Login {...props} getUser={this.getTheUser} showMyRecipes={this.showMyRecipes} showSavedRecipes={this.showSavedRecipes}/>} />
          <Route path="/logout" render={props => <Logout {...props} getUser={this.getTheUser} />} />
          <Route path="/main" render={props => <MainPage {...props} getUser={this.getTheUser} user={this.state.loggedInUser} saved={this.state.savedRecipes} showMyRecipes={this.showMyRecipes} showSavedRecipes={this.showSavedRecipes}/>} />
          <Route path="/profile" render={props => <Profile {...props} user={this.state.loggedInUser} getUser={this.getTheUser} saved={this.state.savedRecipes}/>} myRecipes={this.state.myRecipes} showMyRecipes={this.showMyRecipes} showSavedRecipes={this.showSavedRecipes}/>
          <Route path="/footer" render={props => <Footer {...props} user={this.state.loggedInUser} />} />
          <Route path="/search" render={props => <Search {...props} user={this.state.loggedInUrser} liftUpRecipesSearched={this.getAllRecipe} ingredients={this.getSelectedIngredients} saved={this.state.savedRecipes} showSavedRecipes={this.showSavedRecipes}/>} />
          <Route exact path="/recipe/:id" render={props => <RecipeDetails {...props} showSavedRecipes={this.showSavedRecipes} savedRecipes={this.state.savedRecipes} user={this.state.loggedInUser}/>} />
          <Route path="/recipe/:id/edit" render={props => <EditRecipe {...props} user={this.state.loggedInUser}/>} />
          <Route path="/add" render={props => <AddRecipe {...props} user={this.state.loggedInUser} />} />
          <Route exact path="/users" render={props => <FindUser {...props} user={this.state.loggedInUser} />} />
          <Route path="/users/:id" render={props => <UsersProfile {...props} user={this.state.loggedInUser} />} />
        </Switch>
      </div>
    )
  }
}
