import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
export default class MainRecipeCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedInUser: this.props.logged,
            userId: this.props.logged._id,
            saved: false
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/profile/savedRecipes`, { withCredentials: true })
            .then(data => {
                let filteredArray = data.data.filter(ele => !ele.title) //filter only internal recipes
                let savedRecipeId;
                const saved = filteredArray.some(ele => {
                    if (ele.recipe._id === this.props.id) {
                        savedRecipeId = ele._id
                    }
                    return ele.recipe._id === this.props.id
                })
                this.setState({
                    saved: saved,
                    savedRecipeId: savedRecipeId
                })
            })
    }

    save = () => {
        if (this.state.saved) {
            axios.delete(`${process.env.REACT_APP_API_URL}/api/profile/savedInternalRecipes/${this.state.savedRecipeId}`, { withCredentials: true })
                .then(data => {
                    this.setState({
                        saved: false
                    })
                })
        } else {
            axios.post(`${process.env.REACT_APP_API_URL}/api/profile/savedRecipes`, { recipeId: this.props.id }, { withCredentials: true })
                .then(data => {
                    this.setState({
                        saved: true,
                        savedRecipeId: data.data._id
                    })
                })
        }
        this.props.showSavedRecipes()

    }

    render() {
        let bookmark;
        if (this.props.recipeOwner === this.state.userId) {
            bookmark = null
        } else {
            bookmark = (<p><i className={this.state.saved ? "icon-main fas fa-bookmark" : "icon-main far fa-bookmark"} onClick={this.save}></i></p>)
        }

       let src;
       if(this.props.src === null){
           src = 'https://cdn0.iconfinder.com/data/icons/christmas-2379/60/dish__food__hot__meal__hotel-512.png'
       } else {
           src = this.props.src
       }
       
        return (
            <div className="col-12 col-md-4 col-lg-3 mt-2 d-flex mt-md-4 ">
                <div className="main-card ">
                    <div className="top-card-main">
                        <img className="avatar-main" src={this.props.avatar} alt={this.props.OwnerUsername} />
                        <Link to={`/users/${this.props.recipeOwner}`}><p className="main-card-user">{'@' + this.props.username} </p></Link>
                    </div>

                    <Link to={`/recipe/${this.props.id}`}><img className="recipe-image-main" src={src} alt={this.props.title} /></Link>
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
