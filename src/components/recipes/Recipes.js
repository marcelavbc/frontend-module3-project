import React, { Component } from 'react'
import './Recipes.css'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class Recipes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            saved: false,
        }

        this.open = this.open.bind(this)
    }

    open = () => {
        console.log('clicked')
        this.setState({
            open: !this.state.open
        })
    }

    save = () => {
        console.log('saved')
        axios.post('http://localhost:5000/api/profile/savedRecipes', {recipeId: this.props.id}, { withCredentials: true })
        .then(data => {
            this.setState({
                saved: !this.state.saved
            })
        })
        
    }

    render() {
        return (
            <div className="recipe-card col-md-3">
                <h5 className="card-title recipe-title d-flex align-items-center justify-content-center">{this.props.title}</h5>
                <img className="recipe-image" src={this.props.src} alt={this.props.title} />
                <div className="card-icons">
                    <div className="wrapper">
                        <i className="icon far fa-clock"></i>
                        <span className="badge minuts">{this.props.minutes}</span>
                    </div>
                    <div className="wrapper">
                        <i className="icon fas fa-utensils"></i>
                        <span className="badge">{this.props.serving}</span>
                    </div>
                    <div className="wrapper">
                        <i className={this.state.open ? "icon fas fa-question-circle" : "icon far fa-question-circle"} onClick={this.open}></i>
                        <span className="badge">{this.props.missed}</span>
                    </div>
                    <Link to={`/recipe/${this.props.id}`}><i className="icon fas fa-info"></i></Link>
                    <i className={this.state.saved ? "icon fas fa-bookmark" : "icon far fa-bookmark"} onClick={this.save}></i>
                </div>

                <div className={this.state.open ? "panel-collapse" : "panel-collapse panel-close"}>
                    <ul>
                        {this.props.missing.map((ele, i) => <li className="miss-ingredients-list" key={i}>{ele.name}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}
