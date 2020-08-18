import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <h1>Cook!</h1>
                <div className="d-flex w-100 justify-content-center">
                    <Link to={"/signup"}><button className="btn">Sign up</button></Link>
                    <Link to={"/login"}><button className="btn">Login</button></Link>
                </div>
            </div>
        )
    }
}
