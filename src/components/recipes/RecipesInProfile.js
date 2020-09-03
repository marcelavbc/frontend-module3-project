import React, { Component } from 'react'
import './Recipes.css';
import { Link } from 'react-router-dom';



export default class RecipesInProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: false,
            loggedInUser: this.props.logged,

        }
    }
    render() {
        let edit;
        if (this.props.recipeOwner === null) {
            edit = <i className="info-icon-profile fas fa-bookmark"></i>
        } else {
            edit = <i className="info-icon-profile fas fa-trash"></i>
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
