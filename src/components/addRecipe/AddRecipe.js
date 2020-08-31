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
        const form = new FormData()
        form.append('owner', this.props.user._id)
        this.state = {
            loggedInUser: this.props.user,
            title: '',
            readyInMinutes: 0,
            servings: 0,
            extendedIngredients: [],
            analyzedInstructions: [],
            image: '', 
            owner: this.props.user._id, 
            form: form
        }
    }

    handleChange = (e) => {
        const form = this.state.form
        form.set(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value,
            form:form
        })
    }

    liftIngredientsState = (obj) => {
        const form = this.state.form
        form.set("extendedIngredients", JSON.stringify(obj))
        this.setState({
            extendedIngredients: obj,
            form: form
        })
    }

    liftMethodsState = (obj) => {
        const form = this.state.form
        form.set("analyzedInstructions", JSON.stringify(obj))
        this.setState({
            analyzedInstructions: obj,
            form: form
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        console.log('salvando')
        axios.post("http://localhost:5000/api/profile/recipes", this.state.form, {withCredentials:true})
        .then(response => {
            console.log('salvei')

            this.setState({
                title: '',
                readyInMinutes: 0,
                servings: 0,
                extendedIngredients: [],
                analyzedInstructions: [],
                image: ''
            })  
        })

    }

    handleFileUpLoad = (event) => {
        console.log('event.target.files[0]', event.target.files[0])
        const uploadImage = this.state.form
        uploadImage.set("image", event.target.files[0])
        this.setState({
            form: uploadImage
        })

    }

    render() {

        return (
            <div className="container-fluid">
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
                            <input
                                type="file"
                                id="file"
                                name="image"
                                onChange={e => this.handleFileUpLoad(e)}
                            />

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


