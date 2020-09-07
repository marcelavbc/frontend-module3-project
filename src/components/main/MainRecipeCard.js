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
        axios.get('http://localhost:5000/api/profile/savedRecipes', { withCredentials: true })

            .then(data => {
                let savedRecipeId;
                const saved = data.data.some(ele => {
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
            console.log('unsave button clicked')
            axios.delete(`http://localhost:5000/api/profile/savedInternalRecipes/${this.state.savedRecipeId}`, { withCredentials: true })
                .then(data => {
                    this.setState({
                        saved: false
                    })
                })
        } else {
            console.log('save button clicked')

            axios.post('http://localhost:5000/api/profile/savedRecipes', { recipeId: this.props.id }, { withCredentials: true })
                .then(data => {
                    console.log('data quando salva' , data.data)
                    this.setState({
                        saved: true,
                        savedRecipeId: data.data._id
                    })
                })
        }

    }



    render() {
        // console.log('state in card', this.state.savedRecipes)
        // if (this.props.savedRecipes) {
        //     let isSaved = this.props.saved.find(ele => ele.recipe._id = this.props.id)
        //     console.log('isSaved', isSaved)
        // }
        // isOwner = this.props.recipeOwner === this.state.userId
        // if (this.props.saved) {
        //     isSaved = this.props.saved.find(ele => ele.recipe._id = this.props.id)
        //     console.log('isSaved', isSaved)
        //     if (isSaved) {
        //         bookmark = (<p><i className="icon-main fas fa-bookmark" onClick={this.unSave}></i></p>)
        //     } else {
        //         bookmark = (<p><i className="icon-main far fa-bookmark" onClick={this.save}></i></p>)
        //     }
        // }

        let bookmark;


        if (this.props.recipeOwner === this.state.userId) {
            bookmark = null
        } else {
            bookmark = (<p><i className={this.state.saved ? "icon-main fas fa-bookmark" : "icon-main far fa-bookmark"} onClick={this.save}></i></p>)
        }


        // if (this.state.savedRecipes) {
        //     isSaved = this.props.saved.find(ele => ele.state.savedRecipes._id = ele._id)
        //     console.log('isSaved', isSaved)
        // } else {
        //     console.log('not saved recipes')
        // }

        // if (this.props.recipeOwner === this.state.userId) {
        //     bookmark = null
        // } else {
        //     bookmark = (<p><i className={this.state.saved ? "icon-main fas fa-bookmark" : "icon-main far fa-bookmark"} onClick={!this.state.save ? this.save : this.unsave}></i></p>)
        // }





        // if(this.state.savedRecipes) {
        //     isSaved = this.props.saved.find(ele => ele.state.savedRecipes._id = ele._id)
        //     console.log("isSaved", isSaved)
        // }

        console.log('state in card', this.state)

        return (
            <div className="col-12 mt-2 d-flex ">
                <div className="main-card card">
                    <div className="top-card-main">
                        <img className="avatar-main" src={this.props.avatar} alt={this.props.OwnerUsername} />
                        <Link to={`/users/${this.props.recipeOwner}`}><p className="main-card-user">{'@' + this.props.username}</p></Link>
                    </div>

                    <Link to={`/recipe/${this.props.id}`}><img className="recipe-image-main" src={this.props.src} alt={this.props.title} /></Link>
                    <div className="card-body main-recipe-description">
                        <p className="recipe-title-main text-center">{this.props.title}</p>
                        <div className="main-icons">
                            <p><i className="icon-main fas fa-utensils mr-2"></i>{this.props.servings}</p>
                            <p><i className="icon-main far fa-clock mr-2"></i>{this.props.readyInMinutes}</p>
                            {/* {!isOwner && bookmark} */}
                            {bookmark}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
