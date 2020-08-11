import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class ProfileEdit extends Component {
    render() {
        return (
            <div>
                <nav className="navbar">
                    <p>My Profile</p>
                    <Link to="/profile/edit"> <img className="profile-picture" src={this.props.user.avatar} width="30" height="30" alt="" /></Link>
                </nav>
                <h1>Edit page</h1>
            </div>
        )
    }
}
