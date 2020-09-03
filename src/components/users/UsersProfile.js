import React, { Component } from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar';
import axios from 'axios'

export default class UsersProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedUser: this.props.user,
            id: this.props.match.params.id,
        }
        this.getUserData = this.getUserData.bind(this)
    }


    componentDidMount() {
        this.getUserData()

    }

    getUserData() {
        axios.get(`http://localhost:5000/api/users/${this.state.id}`)
            .then(response => {
                console.log('response', response.data[0])
                let user = response.data[0]
                let userRecipes = response.data
                userRecipes.shift()
                console.log('array without first element:' , userRecipes)
                this.setState({
                    user: user,
                    recipes : userRecipes
                })
            })
    }

    render() {
        let image;
        let name;
        let quote;
        let userRecipes;

        if (this.state.user) {
            image = this.state.user.avatar
            name = this.state.user.username
            quote = this.state.user.quote
            userRecipes = this.state.recipes.map((ele, i) => {
                return <p>{ele.title}</p>
            })
        } else {
            image = null
            name = null
            quote = null
            userRecipes =null
        }

        return (
            <div className="container-fluid">
                <div>
                    <div className="row">
                        <Navbar user={this.state.loggedUser} text={name} link='/users' />
                    </div>

                    <div className="row mb-5 mt-5">
                        <section className="profile-info-div">
                            <div className="col user-data">
                                <img className="profile-picture" src={image} alt={name} />
                            </div>

                            <div className="col-8 user-nickname">

                                <p className="nickname">@{name}</p>
                                <div className="d-flex align-items-center">
                                    <p>{quote}</p>
                                </div>
                                <hr></hr>
                            </div>
                        </section>

                        <div className="recipe-book row">
                            <div className="col ml-2 mt-3">
                            <h5>Recipes</h5>
                            {userRecipes}
                            </div>
                            
                        </div>

                    </div>


                </div>
                <div className="row">

                    <Footer user={this.state.loggedUser} />

                </div>

            </div>
        )
    }
}
