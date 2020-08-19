import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Footer.css'

export default class Footer extends Component {
    render() {
        return (
            <nav className="navbar col">
                <Link to="/search"><i className="fas fa-search"></i></Link>
                <Link to="/add"><i className="fas fa-plus"></i></Link>
                <i className="far fa-bell"></i>
                <Link to="/profile"><i className="far fa-user"></i></Link>
            </nav>

        )
    }
}
