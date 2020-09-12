import React, { Component } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import InputForm from '../addRecipe/InputForm'
import InputFormMethods from '../addRecipe/InputFormMethods'


export default class EditRecipe extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loggedInUser: this.props.user,
            id: this.props.match.params.id,
        }
    }


    componentDidMount() {
        this.getRecipeDetails()
    }

    getRecipeDetails = () => {
        axios.get(`http://localhost:5000/api/recipes/${this.state.id}`)
            .then(response => {
                this.setState({
                    recipe: response.data,
                    title: response.data.title,
                    show: false
                })
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

    handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        //montar obj body 
        const body = {
            owner: this.state.recipe.owner,
            title: this.state.title,
            servings: this.state.recipe.servings,
            readyInMinutes: this.state.recipe.readyInMinutes,
            extendedIngredients: this.state.recipe.extendedIngredients,
            analyzedInstructions: this.state.recipe.analyzedInstructions,
            imagePath: this.state.recipe.imagePath
        }
        axios.put(`http://localhost:5000/api/recipe/${this.state.id}`, body, { withCredentials: true })
            .then(response => {
                console.log('response', response)
                this.props.history.push('/profile')
                this.getRecipeDetails()
            })

    }


    render() {

        let photo;
        let title;
        let servings;
        let readyInMinutes;
        let extendedIngredients;
        let analyzedInstructions;

        if (this.state.recipe) {
            photo = this.state.recipe.imagePath
            title = this.state.recipe.title
            servings = this.state.recipe.servings
            readyInMinutes = this.state.recipe.readyInMinutes
            extendedIngredients = this.state.recipe.extendedIngredients.map((ele, i) => {
                return <li key={i}>
                    <input
                        className="add-input add-number "
                        type="number"
                        placeholder={ele.amount}
                        name="amount"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        className="add-input"
                        type="text"
                        placeholder={ele.unit}
                        name="unit"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        className="add-input"
                        type="text"
                        placeholder={ele.name}
                        name="name"
                        onChange={e => this.handleChange(e)}
                    />
                </li>


            })
            analyzedInstructions = this.state.recipe.analyzedInstructions[0].steps.map((ele, i) => {
                return <li className="mb-2" key={i}>
                    <input
                        className="w-100 add-input"
                        type="text"
                        placeholder={ele.number}
                        name="number"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        className="w-100 add-input"
                        type="text"
                        placeholder={ele.step}
                        name="step"
                        onChange={e => this.handleChange(e)}
                    />
                </li>
            })

        } else {
            photo = null;
            title = null;
            servings = null;
            readyInMinutes = null
            readyInMinutes = null;
            extendedIngredients = null;
        }

        return (
            <div className="container-fluid">
                <div className="mb-5 mt-5">
                    <div className="row">
                        <Navbar user={this.state.loggedInUser} text='Edit' link='/main' />
                    </div>

                    <div className="row add">
                        <div className="col-12">
                            <form onSubmit={this.handleFormSubmit} autoComplete="new-search">
                                <div className="mb-4">
                                    <div>
                                        <img className="w-100" src={photo} alt='exemplo' onClick={() => this.handleOpen()} />
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
                                                    onChange={e => this.handleChange(e)} />
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="add-input w-100"
                                            type="text"
                                            placeholder={title}
                                            value={this.state.title}
                                            name="title"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="small-info w-100 justify-content-around mb-4">
                                        <div className="form-group">
                                            <i className="icon-add far fa-clock mr-2"></i>
                                            <input
                                                className="add-input add-number"
                                                type="number"
                                                placeholder={readyInMinutes}
                                                name="readyInMinutes"
                                                onChange={e => this.handleChange(e)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <i className="icon-add fas fa-utensils mr-2"></i>
                                            <input
                                                className="add-input add-number"
                                                type="number"
                                                placeholder={servings}
                                                name="servings"
                                                onChange={e => this.handleChange(e)}
                                            />
                                        </div>
                                        <div>
                                            <p>Ingredients</p>
                                            {extendedIngredients}
                                            <p>Instructions</p>
                                            {analyzedInstructions}
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group-append">
                                    <input className="btn btn-save-add mt-3" type="submit" value="Save" onSubmit={this.handleFormSubmit} />
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
