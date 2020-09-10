import React, { Component } from 'react'
import './AddRecipes.css'


export default class InputFormMethods extends Component {
    constructor(props) {
        super(props)
        this.state = {
            analyzedInstructions: [
                {
                    steps: [
                        {
                            number: '',
                            step: ''
                        }
                    ]

                }]
        }
    }

    handleChange = (index, event) => {
        // console.log(index, event.target.name)
        const values = [...this.state.analyzedInstructions[0].steps]
        values[index][event.target.name] = event.target.value
        // console.log('values:', values)
        this.setState({
            analyzedInstructions: [{ steps: values }]
        })
        this.props.liftMethodsState([{ steps: values }])
    }

    addInput = () => {
        this.setState({
            analyzedInstructions: [{ steps: [...this.state.analyzedInstructions[0].steps, { number: '', step: '' }] }]
        })
    }

    removeInput = (index) => {
        const values = [...this.state.analyzedInstructions[0].steps]
        values.splice(index, 1)
        const arr = [...this.state.analyzedInstructions]
        arr.steps = values
        console.log('arr', arr)
        this.setState({
            analyzedInstructions: arr
        })
        this.props.liftMethodsState(values)
    }

    render() {
        // console.log('state in form:', this.state)
        let { analyzedInstructions } = this.state
        return (
            <div className="inputs-ingredients">

                {analyzedInstructions[0].steps.map((ele, index) => {

                    return (
                        <div key={index} className="form-group input-ingredients row">
                            <input
                                className="add-input add-number col-2"
                                type="number"
                                name="number"
                                value={ele.number}
                                key={'number' + index}
                                placeholder={index + 1}
                                autoComplete="off"
                                onChange={(event) => this.handleChange(index, event)}
                            />
                            <input
                                className="add-input add-number col-7 mx-1"
                                type="text"
                                placeholder="Instruction"
                                name="step"
                                value={ele.step}
                                key={'step' + index}
                                autoComplete="off"
                                onChange={(event) => this.handleChange(index, event)}
                            />

                            <i className="icon-add col-1 fas fa-trash text-center" onClick={() => this.removeInput(index)}></i>
                            <i className="fas fa-plus col-1 add-ingredient" onClick={this.addInput}></i>
                        </div>
                    )
                })}
            </div>
        )
    }
}


