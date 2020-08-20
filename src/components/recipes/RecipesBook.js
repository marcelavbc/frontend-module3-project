import React, { Component } from 'react'
import axios from 'axios'
import Link from 'react-router-dom'

export default class RecipesBook extends Component {
    constructor() {
        super();
        this.state = { listOfRecipes: [] };
    }
    getAllRecipes = () => {
        axios.get(`http://localhost:5000/api/recipes`)
            .then(responseFromApi => {
                this.setState({
                    listOfRecipes: responseFromApi.data
                })
            })
    }

    componentDidMount() {
        this.getAllRecipes();
    }


    render() {
        return (
            <div>
                <div>
                    {this.state.listOfRecipes.map(recipe => {
                        return (
                            <div key={recipe._id}>
                                <h3>{recipe.title}</h3>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}
