import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Users.css'

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

    render() {
        return (
            <div>
                <div className="recipe-div recipe-div-user-profile">
                    <div className="info-file">
                        <img className="my-recipe-image mr-2" src={this.props.src} alt={this.props.title} />
                        <p className="m-0 text-title">{this.props.title}</p>
                    </div>
                    <div className="recipes-icons mx-2">
                        <Link to={`/recipe/${this.props.id}`}><i className="fas fa-info info-icon-profile"></i></Link>
                    </div>
                </div>
            </div>
        )
    }
}