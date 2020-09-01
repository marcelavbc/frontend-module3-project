
import React, { Component } from 'react'
import './AddRecipes.css'


export default class InputForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            extendedIngredients: [
                {
                    name: '',
                    amount: 0,
                    unit: ''
                }]
        }
    }

    handleChange = (index, event) => {
        // console.log(index, event.target.name)
        const values = [...this.state.extendedIngredients]
        values[index][event.target.name] = event.target.value
        this.setState({
            extendedIngredients: values
        })
        this.props.liftIngredientsState(values)
    }

    addInput = () => {
        this.setState((preState) => ({
            extendedIngredients: [...preState.extendedIngredients, { name: '', amount: 0, unit: '' }]
        }))
    }

    removeInput = (index) => {
        const values = [...this.state.extendedIngredients]
        values.splice(index, 1)
        this.setState({
            extendedIngredients: values
        })
        this.props.liftIngredientsState(values)
    }

    render() {
        // console.log('state in form:', this.state)
        let { extendedIngredients } = this.state
        return (
            <div className="inputs-ingredients">

                {extendedIngredients.map((ele, index) => {

                    return (

                        <div key={index} className="form-group input-ingredients row">
                            <div className="add-font col-12 mb-0">
                                <p>Amount:</p>
                                <p>Unit:</p>
                                <p>Name:</p>
                            </div>

                            <input
                                className="add-input add-number col-3"
                                type="number"
                                name="amount"
                                autoComplete="off"
                                onChange={(event) => this.handleChange(index, event)}
                            />

                            <input
                                className="add-input col-3 mx-1"
                                type="text"
                                name="unit"
                                autoComplete="off"
                                onChange={(event) => this.handleChange(index, event)}
                            />

                            <input
                                className="add-input col mx-1"
                                type="text"
                                name="name"
                                autoComplete="off"
                                onChange={(event) => this.handleChange(index, event)}
                            />
                            <i className="icon-add col-1 fas fa-trash text-center" onClick={() => this.removeInput(index)}></i>
                        </div>
                    )
                })}
                <p className="add-indgredient align-self-center" onClick={this.addInput}><i className="fas fa-plus mr-1" onClick={this.addInput}></i>Add</p>
            </div>
        )
    }
}


