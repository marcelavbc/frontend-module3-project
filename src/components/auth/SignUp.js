import React, { Component } from 'react';
import AuthService from '../../auth/auth-services';
import { Link } from 'react-router-dom';
// import axios from 'axios'
import './Auth.css'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', email: '', avatar: '' };
        this.service = new AuthService();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;
        const avatar = this.state.avatar;

        this.service.signup(username, password, email, avatar)
            .then(response => {
                this.setState({
                    username: "",
                    password: "",
                    email: "",
                    avatar: "",
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

    // handleFileUpLoad = (event) => {
    //     console.log("file upload...")
    //     const uploadData = new FormData()
    //     uploadData.append("avatar", event.target.files[0])
    //     axios.post('http://localhost:5000/api/upload', uploadData)
    //         .then(response => {
    //             console.log("file uploaded sucessfully", response.data)
    //             this.setState({
    //                 avatar: response.data.path
    //             })
    //         })
    // }


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
                    {/* <input
                        type="file"
                        name="avatar"
                        onChange={this.handleFileUpLoad}
                        className="edit-profile-input"
                    /> */}

                    <button className="btn log-btn" type="submit">
                        Let's Cook!
                    </button>
                </form>

                {/* <a href="/auth/google">Google</a> */}
                <div className="already">
                    <p className="m-0 mr-3">Already have account?</p>
                    <Link to={"/login"}>Login!</Link>
                </div>

            </div>
        )
    }
}

export default Signup;


