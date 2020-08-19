import React, { Component } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import InputForm from './InputForm'
import './AddRecipes.css'
import InputFormMethods from './InputFormMethods'


export default class AddRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: this.props.user,
            title: '',
            readyInMinutes: 0,
            servings: 0,
            extendedIngredients: [],
            analyzedInstructions: []
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    liftIngredientsState = (obj) => {
        this.setState({
            extendedIngredients: obj
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        console.log('final state:', this.state)
    }

    render() {
        // console.log('state in AddRecipe', this.state)

        return (
            <div className="container">
                <div>
                    <div className="row">
                        <Navbar user={this.state.loggedInUser} text='Add a Recipe' link='/profile' />
                    </div>

                    <div className="row add">
                        <form onSubmit={this.handleFormSubmit} className="form-div col-12">
                            <input
                                className="add-input"
                                type="text"
                                placeholder="Title"
                                name="title"
                                onChange={e => this.handleChange(e)}
                            />
                            <h3 className="add-titles">Ingredients:</h3>
                            <InputForm liftIngredientsState={this.liftIngredientsState} />
                            <h3 className="add-titles">Methods:</h3>
                            <InputFormMethods/>
                            {/*
                                <input className="btn btn-info" type="submit" value="Save" onSubmit={this.handleFormSubmit} /> */}
                        </form>
                    </div>

                </div>
                <div className="row">
                    <Footer user={this.state.loggedInUser} />
                </div>
            </div>
        )
    }
}


