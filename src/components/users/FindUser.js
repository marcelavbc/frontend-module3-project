import React, { Component } from 'react';
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar';
import axios from 'axios'
import './Users.css'
import FindUserSearchBar from './FindUserSearchBar';
import FindUsersList from './FindUsersList';

export default class FindUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: this.props.user,
            users: []
        }
        this.getAllUsers = this.getAllUsers.bind(this)
        this.filter = this.filter.bind(this)

    }

    componentDidMount() {
        this.getAllUsers()
    }
    getAllUsers() {
        axios.get('http://localhost:5000/api/users')
            .then(response => {
                console.log('response', response.data)
                this.setState({
                    users: response.data
                })
            })
    }

    filter(query) {
        console.log("query to filter: ", query)
        this.setState({
            filter: query
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div>
                    <div className="row">
                        <Navbar user={this.state.loggedInUser} text='Cooks' link='/profile' />
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <FindUserSearchBar users={this.state.users} functionToFilter={this.filter} />
                        </div>
                        <div className="col-12">
                            <ul>
                                <FindUsersList users={this.state.users} filter={this.state.filter} />
                            </ul>
                        </div>
                    </div>


                </div>
                <div className="row">

                    <Footer user={this.state.loggedInUser} />

                </div>

            </div>
        )
    }
}
