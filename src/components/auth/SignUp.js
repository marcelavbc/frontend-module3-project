import React, { Component } from 'react';
import AuthService from '../../auth/auth-services';
import { Link } from 'react-router-dom';
// import axios from 'axios'
import './Auth.css'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', email: '', avatar: '', quote: '' };
        this.service = new AuthService();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;
        const avatar = this.state.avatar;
        const quote = this.state.quote

        this.service.signup(username, password, email, avatar, quote)
            .then(response => {
                this.setState({
                    username: "",
                    password: "",
                    email: "",
                    avatar: "",
                    quote: ""
                });
                this.props.getUser(response)//método do pai App.js, enviado a SignUp via props. Usamos aqui para enviar de volta ao pai o objeto de Signup
                this.props.history.push(`/main/`);
            })
            .catch(error => console.log(error))
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="container-fluid auth">
                <h2>Sign up!</h2>
                <form onSubmit={this.handleFormSubmit} className="form-div">
                    <input
                        className="input-form"
                        type="text"
                        placeholder="Create a username"
                        name="username"
                        value={this.state.username}
                        onChange={e => this.handleChange(e)}
                    />

                    <input
                        className="input-form"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={this.state.email}
                        onChange={e => this.handleChange(e)}
                    />

                    <input
                        className="input-form"
                        type="password"
                        placeholder="Create a password"
                        name="password"
                        value={this.state.password}
                        onChange={e => this.handleChange(e)}
                    />
                
                    <button className="btn log-btn" type="submit">
                        Let's Cook!
                    </button>
                </form>

                {/* <a href="/auth/google">Google</a> */}
                <div className="already d-flex flex-column mt-3">
                    <p className="m-0 mr-3 mb-3">Already have account?</p>
                    <Link className="not-found-link" to={"/login"}>Login!</Link>
                    {/* <Link to={"auth/google"}>Google</Link> */}
                </div>

            </div>
        )
    }
}

export default Signup;


