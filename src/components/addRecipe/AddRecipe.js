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
        // console.log(e.target.name)

        const form = this.state.form
        form.set(e.target.name, e.target.value)
        // console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value,
            form: form
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
        axios.post("http://localhost:5000/api/profile/recipes", this.state.form, { withCredentials: true })
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
                this.props.history.push('/main')
            })

    }

    handleFileUpLoad = (event) => {
        // console.log('event.target.files[0]', event.target.files[0])
        const uploadImage = this.state.form
        uploadImage.set("image", event.target.files[0])
        this.setState({
            form: uploadImage
        })

    }

    render() {

        return (
            <div className="container-fluid">
                <div className="mb-5 mt-5">
                    <div className="row">
                        <Navbar user={this.state.loggedInUser} text='Add a Recipe' link='/main' />
                    </div>

                    <div className="row add">
                        <div className="col-12">
                            <form onSubmit={this.handleFormSubmit} autoComplete="new-search">
                                <div className="form-group">
                                    <input
                                        className="add-input w-100 text-center"
                                        type="text"
                                        placeholder="Title"
                                        name="title"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <i className="icon-add far fa-clock mr-2"></i>
                                    <input
                                        className="add-input add-number"
                                        type="number"
                                        placeholder="in minutes"
                                        name="readyInMinutes"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <i className="icon-add fas fa-utensils mr-2"></i>
                                    <input
                                        className="add-input add-number"
                                        type="number"
                                        placeholder="Servings"
                                        name="servings"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>

                                <p className="add-titles">Ingredients:</p>
                                <InputForm liftIngredientsState={this.liftIngredientsState} />
                                <p className="add-titles">Methods:</p>
                                <InputFormMethods liftMethodsState={this.liftMethodsState} />

                                <div className="input-group input-group-add">
                                    <div className="custom-file">
                                        <input type="file" 
                                        className="custom-file-input" 
                                        name="image" 
                                        id="file" 
                                        multiple
                                        onChange={e => this.handleFileUpLoad(e)} />
                                        <label className="custom-file-label" htmlFor="file">Choose file</label>
                                    </div>
                                    <div className="input-group-append">
                                        <input className="btn btn-save-add" type="submit" value="Send" onSubmit={this.handleFormSubmit} />
                                    </div>
                                </div>

                            </form>
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


