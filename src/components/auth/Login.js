import React, { Component } from 'react'
import AuthService from '../../auth/auth-services';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
        this.service = new AuthService();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        this.service.login(username, password)
            .then(response => {
                this.setState({
                    username: "",
                    password: "",
                });
                this.props.getUser(response)
                this.props.history.push(`/profile/`);
            })
            .catch(error => console.log("the error:", error))
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }


    render() {
        return (
            <div className="auth">
                <h2>Login!</h2>
                <form onSubmit={this.handleFormSubmit} className="form-div">
                    <input
                        className="input-form"
                        type="text"
                        placeholder="Your username"
                        name="username"
                        value={this.state.username}
                        onChange={e => this.handleChange(e)}
                    />

                    <input
                        className="input-form"
                        type="password"
                        placeholder="Your password"
                        name="password"
                        value={this.state.password}
                        onChange={e => this.handleChange(e)}
                    />
                    <button className="btn log-btn" type="submit">
                        Let's Cook!
                    </button>
                </form>
                <GoogleButton label="Sign up with Google"
                    type="light"
                    className="google-button"
                    onClick={() => { console.log('Google button clicked') }}
                />
                <div className="d-flex flex-column align-items-center">
                    <p>Don't have an account yet?</p>
                    <Link to={"/signup"}><button className="btn log-btn">Sign up!</button></Link>
                </div>
            </div>
        )
    }
}
