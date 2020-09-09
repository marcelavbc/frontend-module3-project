import React, { Component } from 'react'
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import './Recipes.css'
import EditRecipe from './EditRecipe';

export default class RecipeDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: this.props.user,
            id: this.props.match.params.id,
        }
    }

    componentDidMount() {
        this.getRecipeDetails()
    }

    getRecipeDetails = () => {
        axios.get(`http://localhost:5000/api/recipes/${this.state.id}`)
            .then(response => {
                console.log('response2', response.data)
                this.setState({
                    recipe: response.data
                })
            })
    }

    editRecipe = () => {
        console.log('edite recipe')
        return <EditRecipe recipe={this.state.recipe} />
    }

    render() {
        let title;
        let src;
        let servings;
        let readyInMinutes;
        let extendedIngredients;
        let analyzedInstructions;
        let owner;
        let userId;
        let edit;
        let recipeId;
        console.log('this.state in details', this.state)
        if (this.state.recipe) {
            console.log(this.state.recipe)
            title = <p className="details-title mb-0">{this.state.recipe.title || this.state.recipe.recipe.title}</p>
            src = this.state.recipe.image || this.state.recipe.imagePath || this.state.recipe.recipe.imagePath
            servings = this.state.recipe.servings
            readyInMinutes = this.state.recipe.readyInMinutes
            extendedIngredients = this.state.recipe.extendedIngredients.map((ele, i) => {
                return <li key={i}>{ele.amount} {ele.unit} {ele.name}</li>
            })
            analyzedInstructions = this.state.recipe.analyzedInstructions[0].steps.map((ele, i) => {
                return <li className="li-details mb-2" key={i}>{ele.number}) {ele.step}</li>
            })
            recipeId = this.state.id
            if (this.state.recipe.creditsText) {
                owner = null
            } else if (this.state.recipe.owner.username) {
                userId = this.state.recipe.owner._id
                owner = this.state.recipe.owner.username
            }
        } else {
            title = null;
            src = null;
            servings = null;
            readyInMinutes = null;
            extendedIngredients = null;
            owner = null
            recipeId = null
        }


        return (
            <div className="container-fluid">
                <div className="mb-5 mt-5">
                    <div className="row">
                        <Navbar user={this.state.loggedInUser} text='How to cook' link='/main' />
                    </div>
                    <div className="row recipe-detail-div">
                        <div className="col-12 d-flex justify-content-around align-items-center mb-3">
                            {title}
                            <Link to={`/recipe/${recipeId}/edit`}><i className="icon-detail-edit fas fa-pencil-alt" onClick={this.editRecipe} /></Link>

                        </div>
                        <div className="col-6">
                            <img className="img-details" src={src} alt={title} />
                        </div>
                        <div className="col-6">
                            <ul className="details-list">
                                <li>Author: <Link to={`/users/${userId}`}>@{owner}</Link></li>
                                <li><i className="far fa-clock mr-1"></i> {readyInMinutes} minutes</li>
                                <li><i className="fas fa-utensils mr-2"></i>{servings} servings</li>
                            </ul>
                        </div>
                        <div className="col-12 mt-4">
                            <p className="details-info-title">Ingredients:</p>
                            <ul>{extendedIngredients}</ul>
                            <p className="details-info-title">How to cook:</p>
                            <ul>{analyzedInstructions}</ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Footer user={this.state.loggedInUser} />
                </div>
            </div>
        )
    }
}
