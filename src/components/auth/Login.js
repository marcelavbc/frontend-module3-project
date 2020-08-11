import React, { Component } from 'react'
import AuthService from './auth-services';
import './Auth.css'

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
                <form onSubmit={this.handleFormSubmit}>
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

                    <button className="btn text-white" type="submit">
                        Let's Cook!
                    </button>
                </form>


                {/* <p>Already have account?
                <Link to={"/"}> Login</Link>
                </p> */}
            </div>
        )
    }
}
