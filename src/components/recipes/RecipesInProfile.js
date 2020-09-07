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
        console.log('clicked to delete', this.props.id)
        axios.delete(`http://localhost:5000/api/profile/savedInternalRecipes/${this.props.id}`)
            .then(response => {
                console.log(response)
            })
    }

    deleteMyRecipe = () => {
        console.log('delete click')
        // console.log(this.props.id)
        axios.delete(`http://localhost:5000/api/profile/recipe/${this.props.id}`)
            .then(response => {
                console.log(response)
                this.props.updateSaved(response)
            })

    }

    render() {
        // console.log(this.props.id)
        let edit;
        if (this.props.recipeOwner === null) {
            edit = <i className="info-icon-profile fas fa-bookmark" onClick={this.deleteRecipe}></i>
        } else {
            edit = <i className="info-icon-profile fas fa-trash" onClick={this.deleteMyRecipe}></i>
        }



        return (
            <div>
                <div className="recipe-div">
                    <div className="info-file">
                        <img className="my-recipe-image mr-2" src={this.props.src} alt={this.props.title} />
                        <p className="m-0 text-title">{this.props.title}</p>
                    </div>
                    <div className="recipes-icons mx-2">
                        <Link to={`/recipe/${this.props.id}`}><i className="fas fa-info info-icon-profile"></i></Link>
                        {edit}
                    </div>
                </div>
            </div>
        )
    }
}
