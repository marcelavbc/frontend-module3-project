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
        let saved = false;
        let origin = 'internal'
        let savedId = ''
        if (this.props.savedRecipes) {
            saved = this.props.savedRecipes.some(ele => {
                if (ele.recipeId) {
                    if (ele.recipeId == this.props.match.params.id) {
                        origin = 'api'
                        savedId = ele._id
                    }
                    return ele.recipeId == this.props.match.params.id

                } else {
                    if (ele.recipe._id == this.props.match.params.id) {
                        savedId = ele._id

                    }
                    return ele.recipe._id == this.props.match.params.id
                }

            })
            if (this.props.match.params.id.length < 15) {
                origin = 'api'
            }
        }

        this.state = {
            saved: saved,
            loggedInUser: this.props.user,
            id: this.props.match.params.id,
            savedRecipes: this.props.savedRecipes,
            origin: origin,
            savedId: savedId,
        }
    }

    componentDidMount() {
        this.getRecipeDetails()
        this.props.showSavedRecipes()

    }

    getRecipeDetails = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/${this.state.id}`)
            .then(response => {
                this.setState({
                    recipe: response.data
                })
            })
    }



    save = () => {
        if (this.state.saved) {
            if (this.state.origin === 'api') {
                axios.delete(`${process.env.REACT_APP_API_URL}/api/profile/savedApiRecipes/${this.state.savedId}`, { withCredentials: true })
                    .then(response => {
                        // console.log('favorito excluido', response.data)
                        this.setState({
                            saved: false
                        })
                        this.props.showSavedRecipes()
                    })
            } else {
                axios.delete(`${process.env.REACT_APP_API_URL}/api/profile/savedInternalRecipes/${this.state.savedId}`, { withCredentials: true })
                    .then(response => {
                        // console.log('favorito excluido', response.data)
                        this.setState({
                            saved: false
                        })
                        this.props.showSavedRecipes()
                    })
            }
        } else {
            axios.post(`${process.env.REACT_APP_API_URL}/api/profile/savedRecipes`, { recipeId: this.state.id }, { withCredentials: true })
                .then(data => {
                    let copySaved;
                    if (this.props.savedRecipes) {
                        copySaved = [...this.props.savedRecipes]
                    } else {
                        copySaved = []
                    }
                    copySaved.push(data.data)
                    this.setState({
                        saved: true,
                        savedRecipes: copySaved,
                        savedId: data.data._id
                    })
                    this.props.showSavedRecipes()
                })
        }

    }

    editRecipe = () => {
        return <EditRecipe user={this.state.loggedInUser} recipe={this.state.recipe} />
    }

    render() {
        let title;
        let src;
        let servings;
        let readyInMinutes;
        let extendedIngredients;
        let analyzedInstructions;
        let owner;
        let edit;
        let userId;

        if (this.state.recipe) {
            if(this.state.recipe.imagePath === null) {
                src = 'https://cdn0.iconfinder.com/data/icons/christmas-2379/60/dish__food__hot__meal__hotel-512.png'
            } else {
                src = this.state.recipe.image || this.state.recipe.imagePath || this.state.recipe.recipe.imagePath
            }

            title = <p className="details-title m-0 mr-3">{this.state.recipe.title || this.state.recipe.recipe.title}</p>
            servings = this.state.recipe.servings
            readyInMinutes = this.state.recipe.readyInMinutes
            if (this.state.extendedIngredients) {

            }
            if(this.state.extendedIngredients){
                extendedIngredients = this.state.recipe.extendedIngredients.map((ele, i) => {
                    return <li key={i}>{ele.amount} {ele.unit} {ele.name}</li>
                })
            } else {
                extendedIngredients = null
            }
            
            if (this.state.recipe.analyzedInstructions) {
                analyzedInstructions = this.state.recipe.analyzedInstructions[0].steps.map((ele, i) => {
                    return <div key={i}><li className="li-details mb-2"  >{ele.number} {ele.step}</li><hr></hr></div>
                })
            } else {
                analyzedInstructions = null
            }


            if (!this.state.recipe.owner) {
                owner = null
                edit = <i className={this.state.saved ? "icon-details fas fa-bookmark" : "icon-details far fa-bookmark"} onClick={this.save}></i>
                userId = null
            } else if (this.state.loggedInUser._id !== this.state.recipe.owner._id) {
                userId = this.state.recipe.owner._id
                owner = <Link className="link-user" to={`/users/${userId}`}><li className="link-user"><img className="owner-avatar" src={this.state.recipe.owner.avatar} alt="owner" /> @{this.state.recipe.owner.username}</li></Link>//add link
                edit = <i className={this.state.saved ? "icon-details fas fa-bookmark" : "icon-details far fa-bookmark"} onClick={this.save}></i>
            } else {
                edit = <Link to={`/recipe/${this.state.id}/edit`}><i className="fas fa-pencil-alt" onClick={this.editRecipe}></i></Link>
            }
        } else {
            title = null;
            src = null;
            servings = null;
            readyInMinutes = null;
            extendedIngredients = null;
            edit = null
        }

        return (
            <div className="container-fluid">
                <div className="mb-5 mt-5">
                    <div className="row">
                        <Navbar user={this.state.loggedInUser} text='How to cook' link='/main' />
                    </div>
                    <div className="row recipe-detail-div">
                        <div className="col-12 d-flex mb-3 info-principal flex-column">
                            <div className="d-flex align-items-center justify-content-center">
                                {title}
                                {edit}
                            </div>
                        </div>
                        <div className="d-flex row align-items-center">
                            <div className="col-6">
                                <img className="img-details" src={src} alt={title} />
                            </div>
                            <div className="col px-0">
                                <ul className="details-list">
                                    {owner}
                                    <li><i className="far fa-clock"></i> {readyInMinutes} minutes</li>
                                    <li><i className="fas fa-utensils"></i> {servings} servings</li>
                                </ul>
                            </div>
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
