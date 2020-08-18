import React, { Component } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: this.props.user,
        }
    }
    render() {
        console.log("profile state; ", this.state)
        return (
            <div className="profile container">
                <div>
                    <div>
                        <div className="row">
                            <Navbar user={this.state.loggedInUser} text='Profile' link='/login'/>
                        </div>
                        <div className="row profile-container mt-3">
                            <div className="col">
                                <img className="profile-picture" src={this.state.loggedInUser.avatar} alt={this.state.loggedInUser.username} />
                                <Link to="/edit"><p className="link">Edit profile</p></Link>
                            </div>
                            <div className="col-8">
                                <Link to="/logout"><i className="fas fa-power-off"></i></Link>
                                <p>{this.state.loggedInUser.username}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h4 className="bookTitle">My Recipe Book</h4>
                            <hr></hr>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h4>Cards</h4>
                            <hr></hr>
                        </div>
                    </div>
                </div>
                <div className="row">

                    <Footer user={this.state.loggedInUser} />

                </div>

            </div>
        )
    }
}
