
import React, { Component } from 'react'
import './Ingredients.css'


export default class IngredientAdded extends Component {
    render() {
        return (
            <div className="ingredient-div">
                <i className="fas fa-trash-alt" onClick={()=> this.props.deleteItem(this.props.item)}></i>
                <p>{this.props.item}</p>
            </div>
        )
    }
}
