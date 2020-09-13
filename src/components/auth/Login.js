import React, { Component } from 'react'
import AuthService from '../../auth/auth-services';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: ''};
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
                // console.log('response in login component:', response)
                this.props.getUser(response)
                this.props.showMyRecipes()
                this.props.showSavedRecipes()
                this.props.history.push(`/main`);
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
            <div className="container-fluid auth">
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

                <div className="already d-flex flex-column mt-3">
                    <p className="m-0 mr-3 mb-3">Don't have an account yet?</p>
                    <Link to={"/signup"}>Sign up!</Link>
                </div>
            </div>
        )
    }
}
