import React, { Component } from 'react'
import './Extras.css'

export default class NotFound extends Component {
    render() {
        return (
            <div className="not-found-div">
                <h4 className="ops text-center">Ops! There is nothing to eat here, dude!</h4>
                <img src="/images/no-comer.png" className="" alt="not-found"/>
                <p className="not-found text-center">Would you like to see to your <a className="not-found-link" href="/profile">profile</a>?</p>
                <p className="not-found text-center">Or you can try to <a className="not-found-link" href="/login">login</a> again..</p>
            </div>
        )
    }
}
