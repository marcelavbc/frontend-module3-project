import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class FindUsersList extends Component {


    render() {
        let filteredUsers;
        let rows;
        if (this.props.filter) {
            filteredUsers = this.props.users.filter(ele => {
                return ele.username.includes(this.props.filter.toLowerCase())
            })
            rows = filteredUsers.map((ele, i) => {
                return <Link key={i} to={`/users/${ele._id}`}><li className="list-avatar" key={i}><img className="find-avatar" src={ele.avatar} alt={ele.username} />@{ele.username}</li></Link>
            })
        } else {
            rows = this.props.users.map((ele, i) => {
                return <Link key={i} to={`/users/${ele._id}`}><li className="list-avatar" key={i}><img className="find-avatar" src={ele.avatar} alt={ele.username} />@{ele.username}</li></Link>
            })
        }
        return (
            <div className="mb-5">
                <ul>{rows}</ul>
            </div>
        )
    }
}
