
import React, { Component } from 'react'
import './AddRecipes.css'


export default class InputForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            extendedIngredients: [
                {
                    name: '',
                    amount: '',
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

        this.setState({
            extendedIngredients: [...this.state.extendedIngredients, { name: '', amount: '', unit: '' }]
        })
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
            <div className="inputs-ingredients row mx-2 mb-4">
                {extendedIngredients.map((ele, index) => {

                    return (
                        <div key={index} className="form-group input-ingredients-row align-items-center " >
                            <input
                                className="add-input add-number col-2"
                                type="number"
                                name="amount"
                                key={'amount' + index}
                                value={ele.amount}
                                autoComplete="off"
                                placeholder="Qt."
                                onChange={(event) => this.handleChange(index, event)}
                            />

                            <input
                                className="add-input col-3 mx-3"
                                type="text"
                                name="unit"
                                key={'unit' + index}
                                value={ele.unit}
                                autoComplete="off"
                                placeholder="Un."
                                onChange={(event) => this.handleChange(index, event)}
                            />

                            <input
                                className="add-input col"
                                type="text"
                                name="name"
                                key={'name' + index}
                                value={ele.name}
                                autoComplete="off"
                                placeholder="Name"
                                onChange={(event) => this.handleChange(index, event)}
                            />
                            <i className="icon-add col-1 fas fa-trash text-center" onClick={() => this.removeInput(index)}></i>
                        </div>
                    )
                })
                }
                <i className="fas fa-plus col-1 add-ingredient" onClick={this.addInput}></i>
            </div>
        )
    }
}


