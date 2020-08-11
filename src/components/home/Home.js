import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'


export default class Home extends Component {
    render() {
        return (
            <div className="home">
            <h1>Cook</h1>
                <Link to={"/signup"}> Create account</Link>
                <Link to={"/login"}> Login</Link>
            </div>
        )
    }
}
