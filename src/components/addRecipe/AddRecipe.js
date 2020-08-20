import React, { Component } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import InputForm from './InputForm'
import './AddRecipes.css'
import axios from 'axios'
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
            analyzedInstructions: [],
            image: ''
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

    liftMethodsState = (obj) => {
        this.setState({
            analyzedInstructions: obj
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        console.log('submited')
        const body = {
            title: this.state.title,
            readyInMinutes: this.state.readyInMinutes,
            servings: this.state.servings,
            extendedIngredients: this.state.extendedIngredients,
            // image: this.state.image, 
            analyzedInstructions: this.state.analyzedInstructions
        }
        axios.post("http://localhost:5000/api/recipes", body, {withCredentials:true})
        .then(response => {
            this.setState({
                title: '',
                readyInMinutes: 0,
                servings: 0,
                extendedIngredients: [],
                analyzedInstructions: [],
                // image: ''
            })
        })

    }

    // handleFileUpLoad = (event) => {
    //     console.log('uploaded')

    // }

    render() {
        console.log('state in AddRecipe', this.state)

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
                            <InputFormMethods liftMethodsState={this.liftMethodsState} />
                            {/* <input
                                type="file"
                                name="image"
                                onChange={this.handleFileUpLoad}
                            /> */}

                            <input className="btn btn-info" type="submit" value="Save" onSubmit={this.handleFormSubmit} />
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


