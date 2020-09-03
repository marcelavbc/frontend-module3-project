import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';



export default class MainRecipeCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: false,
            loggedInUser: this.props.logged,
            userId: this.props.logged._id
        }
    }

    save = () => {
        console.log('saved')
        axios.post('http://localhost:5000/api/profile/savedRecipes', { recipeId: this.props.id }, { withCredentials: true })
            .then(data => {
                this.setState({
                    saved: !this.state.saved,
                    savedRecipes: data
                })
            })
    }

    render() {
        let bookmark;
        if (this.props.recipeOwner === this.state.userId) {
            bookmark = null
        } else {
            bookmark = (<p><i className={this.state.saved ? "icon-main fas fa-bookmark" : "icon-main far fa-bookmark"} onClick={this.save}></i></p>)
        }

        return (
            <div className="col-12 mt-2 d-flex ">
                <div className="main-card card">
                    <div className="top-card-main">
                        <img className="avatar-main" src={this.props.avatar} alt={this.props.username} />
                        <p className="main-card-user">{'@' + this.props.username}</p>
                    </div>

                    <Link to={`/recipe/${this.props.id}`}><img className="recipe-image-main" src={this.props.src} alt={this.props.title} /></Link>
                    <div className="card-body main-recipe-description">
                        <p className="recipe-title-main text-center">{this.props.title}</p>
                        <div className="main-icons">
                            <p><i className="icon-main fas fa-utensils mr-2"></i>{this.props.servings}</p>
                            <p><i className="icon-main far fa-clock mr-2"></i>{this.props.readyInMinutes}</p>
                            {bookmark}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
