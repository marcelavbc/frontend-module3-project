import React, { Component } from 'react'
import './Recipes.css';
import { Link } from 'react-router-dom';
import axios from 'axios'


export default class RecipesInProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: false,
            loggedInUser: this.props.loggedInUser,
            savedRecipes: this.props.saved,
            myRecipes: this.props.myRecipes
        }
    }

    deleteRecipe = () => {
        if (typeof this.props.recipeId === 'number') {
            console.log(this.props.id)
            axios.delete(`${process.env.REACT_APP_API_URL}/api/profile/savedApiRecipes/${this.props.id}`, { withCredentials: true })
                .then(response => {
                    this.props.updateRecipes(response)
                })
        } else if (this.props.recipeOrigin === false) {
            axios.delete(`${process.env.REACT_APP_API_URL}/api/profile/savedInternalRecipes/${this.props.id}`, { withCredentials: true })
                .then(response => {
                    console.log('response when delete', response)
                    console.log(this.props.id)

                    this.props.updateRecipes(response)
                })
        } else {
            axios.delete(`${process.env.REACT_APP_API_URL}/api/profile/recipe/${this.props.id}`, { withCredentials: true })
                .then(response => {
                    this.props.updateMyRecipes(response)
                    
                })
        }
    }



    render() {
        return (
            <div>
                <div className="recipe-div">
                    <div className="info-file">
                        <img className="my-recipe-image mr-2" src={this.props.src} alt={this.props.title} />
                        <p className="m-0 text-title">{this.props.title}</p>
                    </div>
                    <div className="recipes-icons mx-2">
                        <Link to={`/recipe/${this.props.recipeId}`}><i className="fas fa-info info-icon-profile"></i></Link>
                        <i className="info-icon-profile fas fa-trash" onClick={this.deleteRecipe}></i>                    </div>
                </div>
            </div>
        )
    }
}
