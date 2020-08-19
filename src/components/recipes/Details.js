import React, { Component } from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import './Recipes.css'


export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            recipes: this.props.recipes,
            single: {}
        }
    }



    componentDidMount() {
        let id = this.state.id
        let singleRecipe = this.state.recipes.find(ele => ele.id = id)
        this.setState({
            single: singleRecipe
        })
    }


    render() {
        let result = '';
        // let method = ''
        if (this.state.single) {
            console.log('ingredientes: ', this.state.single.extendedIngredients[0].name)
            // let copyIngredients = this.state.single.extendedIngredients
            // result = copyIngredients.map((ele, i) => {
            //     return (
            //         <>
            //             <li className="" key={i}>{ele.name + ' - '} {ele.amount} {ele.unit} </li>
            //             <hr className="line-hr"></hr>
            //         </>
            //     )
            // })

            // let copyToMethods = this.state.single.analyzedInstructions[0].steps
            // console.log('single recipe method: ', copyToMethods)
            // method = copyToMethods.map((ele, i) => {
            //     return (
            //         <>
            //             <li className="" key={i}>{i + 1 + ')'} {ele.step}</li>
            //             <hr className="line-hr"></hr>
            //         </>
            //     )
            // })
        }


        
        // console.log('recipes in details:', this.props)
        // console.log('Id in details:', this.state.id)
        // console.log('Single in details:', this.state.single)
        if (this.state.single) {
            console.log(this.state.single.title)
        }






        return (
            <div className="recipe container">
                <div>
                    <div className="row">
                        <Navbar text='Recipe' link='/search' user={this.props.loggedInUser} />
                    </div>

                    <div className="row mt-5 mx-1 recipe-info">
                        <div className="col-12 p-0">
                            <img className="image-detail" src={this.state.single.image} alt={this.state.single.title} />
                            <p className="centered m-0">{this.state.single.title}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col recipe-icons">
                            <div className="d-flex align-items-center">
                                <i className="icon far fa-clock"></i>
                                <p className="m-0 mx-1">{this.state.single.readyInMinutes + '\''}</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <i className="icon fas fa-utensils"></i>
                                <p className="m-0 mx-1">{this.state.single.servings}</p>
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
                                    {/* {method} */}
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
