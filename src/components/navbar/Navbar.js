import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'

export default class Navbar extends Component {


    render() {
        // console.log("nav props: ", this.props)
        return (
            <nav className="navbar col">
                <Link to={this.props.link}><i className="fas fa-chevron-left"></i></Link>
                <p>{this.props.text}</p>
                <Link to='/users'><img src="/images/search.png" alt="search"/></Link>
            </nav>
        )
    }
}
