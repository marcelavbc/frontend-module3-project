import React, { Component } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer'

export default class Profile extends Component {
    render() {
        console.log(this.props.user)
        return (
            <div className="profile">
                <div>
                    <nav className="navbar">
                        <p>My Profile</p>
                        <img className="profile-picture" src={this.props.user.avatar} width="30" height="30" alt="" />
                    </nav>

                    <div className="container">
                        <div className="row mt-4">
                            <div className="col">
                                <img className="picture" src={this.props.user.avatar} alt={this.props.user.username} />
                            </div>
                            <div className="col">
                                <p>{this.props.user.username}</p>
                                <p>@{this.props.user.email}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col title text-center mt-2">
                                <hr className="line"></hr>
                                <h4>My Recipe Book</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center mt-2">
                                <input placeholder="Search" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col text-center mt-2">
                                {/* aqui vão os cards com as receitas */}
                            </div>
                        </div>
                    </div>
                </div>

                <Footer user={this.props.user} />
            </div>
        )
    }
}
