
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
            <div>

                {extendedIngredients.map((ele, index) => {

                    return (
                        <div key={index} className="form-group input-ingredients row">
                            <div className="add-font col-12">
                                <p>Amount:</p>
                                <p>Unit:</p>
                                <p>Name:</p>
                            </div>

                            <input
                                className="add-input col-3"
                                type="number"
                                placeholder="30"
                                name="amount"
                                onChange={(event) => this.handleChange(index, event)}
                            />

                            <input
                                className="add-input col-3 mx-1"
                                type="text"
                                placeholder="gr."
                                name="unit"
                                onChange={(event) => this.handleChange(index, event)}
                            />

                            <input
                                className="add-input col mx-1"
                                type="text"
                                placeholder="sugar"
                                name="name"
                                onChange={(event) => this.handleChange(index, event)}
                            />
                            <i className="icon-add col-1 fas fa-plus text-center" onClick={this.addInput}></i>
                            <i className="icon-add col-1 fas fa-trash text-center" onClick={() => this.removeInput(index)}></i>
                        </div>
                    )
                })}
            </div>
        )
    }
}


