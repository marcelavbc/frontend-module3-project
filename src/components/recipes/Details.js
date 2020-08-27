import React, { Component } from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import './Recipes.css'


export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
        }
    }

    componentDidMount() {
        let recipe_id = this.state.id
        console.log('data', this.props.recipe)
        let single = this.props.recipe.find(ele => ele.id = recipe_id)
        this.setState({
            single: single
        })
    }


    render() {
        let result = '';
        let method = '';
        let image = '';
        let title = '';
        let minuts = '';
        let servings = '';

        if (this.state.single) {
            console.log(this.state.single.analyzedInstructions[0].steps)
            image = this.state.single.image
            title = this.state.single.title
            minuts = this.state.single.readyInMinutes
            servings = this.state.single.servings
            result = this.state.single.extendedIngredients.map((ele, i) => {
                return (
                    <li key={i}>{ele.amount} {ele.unit} {ele.name}</li>
                )
            })

            method = this.state.single.analyzedInstructions[0].steps.map((ele, i) => {
                return (
                    <li key={i}>{ele.number + ')'} {ele.step}</li>
                )
            })
        }






        return (
            <div className="recipe container">
                <div>
                    <div className="row">
                        <Navbar text='Recipe' link='/search' user={this.props.loggedInUser} />
                    </div>

                    <div className="row mt-5 mx-1 recipe-info">
                        <div className="col-12 p-0">
                            <img className="image-detail" src={image} alt={title} />
                            <p className="centered m-0">{title}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col recipe-icons">
                            <div className="d-flex align-items-center">
                                <i className="icon far fa-clock"></i>
                                <p className="m-0 mx-1">{minuts}</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <i className="icon fas fa-utensils"></i>
                                <p className="m-0 mx-1">{servings}</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <i className="icon fas fa-bookmark"></i>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="cook-instructions">
                                <p>Ingredients:</p>
                                <ul>
                                    {result}
                                </ul>

                            </div>
                        </div>
                        <div className="col-12">
                            <div className="cook-instructions">
                                <p>Method:</p>
                                <ul>
                                    {method}
                                </ul>
                            </div>

                        </div>
                    </div>


                </div>



                <div className="row">

                    <Footer user={this.props.loggedInUser} />

                </div>

            </div>
        )
    }
}
