import React, { Component } from 'react';
import AuthService from './auth-services';
import './Auth.css'



class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', email: '' };
        this.service = new AuthService();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;


        this.service.signup(username, password, email)
            .then(response => {
                this.setState({
                    username: "",
                    password: "",
                    email: "",
                });
                this.props.getUser(response)//método do pai App.js, enviado a SignUp via props. Usamos aqui para enviar de volta ao pai o objeto de Signup
                this.props.history.push(`/profile/`);
            })
            .catch(error => console.log(error))
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    render() {
        return (
            <div className="auth">
                <form onSubmit={this.handleFormSubmit}>
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

export default Signup;


