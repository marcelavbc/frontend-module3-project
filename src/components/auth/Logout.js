import React, { Component } from 'react'
import AuthService from '../../auth/auth-services'
import { Redirect } from 'react-router-dom';


export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
    }

    render() {
        this.service
            .logout()
            .then((response) => {
                this.props.getUser(null)
            })
            .catch((error) => console.log(error));
        return <Redirect to={'/login'} />


    }
}
