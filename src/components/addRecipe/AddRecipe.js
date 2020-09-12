import React, { Component } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import InputForm from './InputForm'
import './AddRecipes.css'
import axios from 'axios'
import InputFormMethods from './InputFormMethods'
import { Modal } from 'react-bootstrap'




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
            form: form,
            show: false
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

    handleOpen = () => {
        // console.log('open')
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
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
                console.log('response', response)
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

        const uploadImage = this.state.form

        uploadImage.set("image", event.target.files[0])
        this.setState({
            form: uploadImage,
            photo: event.target.files[0]
        })

    }

    

    render() {
        let photo;
        if (this.state.photo) {
            console.log(this.state.photo)
            photo = this.state.photo.name
        } else {
            photo = '/images/photo.png'
        }

        return (
            <div className="container-fluid">
                <div className="mb-5 mt-5">
                    <div className="row">
                        <Navbar user={this.state.loggedInUser} text='Add a Recipe' link='/main' />
                    </div>

                    <div className="row add">
                        <div className="col-12">
                            <form onSubmit={this.handleFormSubmit} autoComplete="new-search">
                                <div className="d-flex justify-content-around align-items-center mb-4">
                                    <div>
                                        <img className="file-to-upload" src={photo} alt='exemplo' onClick={() => this.handleOpen()} />
                                        <Modal show={this.state.show} aria-labelledby="contained-modal-title-vcenter" centered>
                                            <Modal.Header>
                                                <Modal.Title className="w-100">
                                                    <i className="far fa-window-close float-right" onClick={() => this.handleClose()}></i>
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <input type="file"
                                                    className=""
                                                    name="image"
                                                    id="file"
                                                    multiple
                                                    onChange={e => this.handleFileUpLoad(e)} />
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="add-input w-100"
                                            type="text"
                                            placeholder="Title"
                                            name="title"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="small-info d-flex w-100 justify-content-around mb-4">
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
                                    </div>
                                    <p className="add-titles">Ingredients:</p>
                                    <InputForm liftIngredientsState={this.liftIngredientsState} />
                                    <p className="add-titles">Methods:</p>
                                    <InputFormMethods liftMethodsState={this.liftMethodsState} />
                                    <div className="input-group-append">
                                        <input className="btn btn-save-add mt-3" type="submit" value="Send" onSubmit={this.handleFormSubmit} />
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


