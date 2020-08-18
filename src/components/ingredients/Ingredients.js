import React, { Component } from 'react'
import './Ingredients.css'


export default class Ingredients extends Component {
    render() {
        return (
            <div className="ingredient-div" onClick={() => this.props.addIndredients(this.props.item)}>
                <img className="ingredient-image" src={`https://spoonacular.com/cdn/ingredients_100x100/${this.props.photo}`} alt={this.props.item} />
                <p>{this.props.item}</p>
            </div>
        )
    }
}
