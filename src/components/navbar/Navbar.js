import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'

export default class Navbar extends Component {


    render() {
        // console.log("nav props: ", this.props)
        return (
            <nav className="navbar fixed-top col">
                <Link to='/main'><img src="/images/cooking.png" alt="logo"/></Link>
                <p>{this.props.text}</p>
                <Link to='/users'><img src="/images/search.png" alt="search"/></Link>
            </nav>
        )
    }
}
