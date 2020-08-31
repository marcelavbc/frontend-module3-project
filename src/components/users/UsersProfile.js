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
        console.log('this.state.id', this.state.id)
        this.getUserData()
        console.log('this.state.user', this.state.user)

    }

    getUserData() {
        axios.get(`http://localhost:5000/api/users/${this.state.id}`)
            .then(response => {
                console.log('response', response)
                this.setState({
                    user: response.data
                })
            })
    }

    render() {
        let image;
        let name;
        let quote;

        if (this.state.user) {
            image = this.state.user.avatar
            name = this.state.user.username
            quote = this.state.user.quote
        } else {
            image = null
            name = null
            quote = null


        }

        return (
            <div className="container-fluid">
                <div>
                    <div className="row">
                        <Navbar user={this.state.loggedUser} text={name} link='/users' />
                    </div>

                    <div className="row profile-container">
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

                        <section className="recipe-book">
                            <h5>Recipes</h5>
                            <hr></hr>
                        </section>

                    </div>


                </div>
                <div className="row">

                    <Footer user={this.state.loggedUser} />

                </div>

            </div>
        )
    }
}
