import React, { Component } from 'react'
import './Recipes.css'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class Recipes extends Component {
    constructor(props) {
        //buscar se a receita já foi salva
        super(props)
        let saved = false
        let recipe;
        let recipeId;
        if (this.props.saved) {
            saved = this.props.saved.some(ele => {
                if (ele.recipeId) {
                    return ele.recipeId === this.props.id
                }
                return false
            })
            recipe = this.props.saved.find(ele => ele.recipeId === this.props.id)
            if (recipe) {
                recipeId = recipe._id
            } else {
                recipeId = null
            }
        }
        this.state = {
            open: false,
            saved: saved,
            savedRecipes: this.props.saved,
            recipeId: recipeId
        }
        this.open = this.open.bind(this)
    }



    open = () => {
        this.setState({
            open: !this.state.open
        })
    }

    save = () => {
        if (this.state.saved) {
            axios.delete(`${process.env.REACT_APP_API_URL}/api/profile/savedApiRecipes/${this.state.recipeId}`, { withCredentials: true })
                .then(data => {
                    this.setState({
                        saved: false
                    })
                    this.props.showSavedRecipes()

                })
        } else {
            axios.post(`${process.env.REACT_APP_API_URL}/api/profile/savedRecipes`, { recipeId: this.props.id }, { withCredentials: true })
                .then(data => {
                    let copySaved;

                    if(this.state.savedRecipes){
                        copySaved = [...this.state.savedRecipes]
                        copySaved.push(data.data)
                    } else {
                        copySaved.push(data.data)
                    }
                    this.setState({
                        saved: true,
                        savedRecipes: copySaved
                    })
                    this.props.showSavedRecipes()
                })
        }

    }
    render() {
        return (
            <div className="recipe-card col-md-3">
                <h5 className="card-title recipe-title d-flex align-items-center justify-content-center">{this.props.title}</h5>
                <img className="recipe-image" src={this.props.src} alt={this.props.title} />
                <div className="card-icons">
                    <div className="wrapper">
                        <i className="icon far fa-clock"></i>
                        <span className="badge minuts">{this.props.minutes}</span>
                    </div>
                    <div className="wrapper">
                        <i className="icon fas fa-utensils"></i>
                        <span className="badge">{this.props.serving}</span>
                    </div>
                    <div className="wrapper">
                        <i className={this.state.open ? "icon fas fa-question-circle" : "icon far fa-question-circle"} onClick={this.open}></i>
                        <span className="badge">{this.props.missed}</span>
                    </div>
                    <Link to={`/recipe/${this.props.id}`}><i className="icon fas fa-info"></i></Link>
                    <i className={this.state.saved ? "icon fas fa-bookmark" : "icon far fa-bookmark"} onClick={this.save}></i>
                </div>

                <div className={this.state.open ? "panel-collapse" : "panel-collapse panel-close"}>
                    <p>Ingredients: </p>
                    <ul>
                        {this.props.usedIngredients.map((ele, i) => <li className="miss-ingredients-list" key={i}>{ele.name}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}
