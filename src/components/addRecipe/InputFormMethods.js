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
                            number: 0,
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
            analyzedInstructions: [{steps: values}]
        })
        this.props.liftMethodsState([{steps: values}])
    }

    addInput = () => {
        this.setState({
            analyzedInstructions: [{steps: [...this.state.analyzedInstructions[0].steps, { number: 0, step: '' }]}]
        })
    }

    removeInput = (index) => {
        const values = [...this.state.analyzedInstructions]
        values.splice(index, 1)
        this.setState({
            analyzedInstructions: values
        })
        this.props.liftMethodsState(values)
    }

    render() {
        // console.log('state in form:', this.state)
        let { analyzedInstructions } = this.state
        return (
            <div>

                {analyzedInstructions[0].steps.map((ele, index) => {
                    return (
                        <div key={index} className="form-group row">
                            <input
                                className="add-input col-2"
                                type="number"
                                name="number"
                                placeholder={index + 1}
                                onChange={(event) => this.handleChange(index, event)}
                            />
                            <input
                                className="add-input col-8"
                                type="text"
                                placeholder="Instruction"
                                name="step"
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


