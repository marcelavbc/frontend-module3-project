
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
        this.handleInputVluleChange = this.handleInputVluleChange.bind(this);
        this.handleAddingredient = this.handleAddingredient.bind(this);
        this.handleRemoveInput = this.handleRemoveInput.bind(this);



    }

    handleInputVluleChange(e, idx) {
        let nextSocialData = this.state.extendedIngredients.slice();
        nextSocialData[idx].name = e.target.value;
        this.setState({ extendedIngredients: nextSocialData });
        this.props.liftIngredientsState(nextSocialData)
    }

    handleAddingredient() {
        let array = this.state.extendedIngredients;
        array.push({ id: array.length + 1});
        this.setState({ extendedIngredients: array });
    }

    handleRemoveInput(idx) {
        let someArray = this.state.extendedIngredients;
        someArray.splice(idx, 1);
        this.setState({ extendedIngredients: someArray });
    }

    render() {
        // console.log('state in form:', this.state)
        let { extendedIngredients } = this.state
        console.log(extendedIngredients)
        return (
            <div className="inputs-ingredients">
                <div>
                    <button
                        className="new-button btn btn-primary mb-4"
                        type="button"
                        onClick={this.handleAddingredient}>
                        <span>
                            <span className="buttonText">Click to add a new ingredient</span>
                        </span>
                    </button>
                </div>

                <table className="table mt-3 bordered table-hover  white-table addNewSocial">
                    <tbody>
                        {extendedIngredients.map((ele, idx) => {
                            console.log(ele)
                            return <tr key={idx}>
                                <td className="col-6 socialInput">
                                    <input
                                        type='number'
                                        placeholder={`Add Amount`}
                                        value={ele.name}
                                        onChange={e => this.handleInputVluleChange(e, idx)}
                                    />
                                </td>

                                {/* <td className="col-6 socialInput">
                                    <input
                                        type='text'
                                        placeholder={`Add unit`}
                                        value={ele.name}
                                        onChange={e => this.handleInputVluleChange(e, idx)}
                                    />
                                </td>
                                <td className="col-6 socialInput">
                                    <input
                                        type='text'
                                        placeholder={`Add ingredient name`}
                                        value={ele.name}
                                        onChange={e => this.handleInputVluleChange(e, idx)}
                                    />
                                </td> */}
                                <td className="col-2 closingLink">
                                    <div
                                        className="fas fa-fw fa-times"
                                        onClick={() => this.handleRemoveInput(idx)}>remove
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

                {/* {extendedIngredients.map((ele, index) => {

                    return (
                        <div key={index} className="form-group input-ingredients row" >
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
                            <i className="fas fa-plus col-1 add-ingredient" onClick={this.addInput}></i>
                        </div>
                    )
                })
                } */}
            </div>
        )
    }
}


