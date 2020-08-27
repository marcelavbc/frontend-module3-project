import React, { Component } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar';
import { Modal } from 'react-bootstrap'
import axios from 'axios'
// import RecipesBook from '../recipes/RecipesBook';
export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: this.props.user,
            avatar: this.props.user.avatar,
            show: false,
            editQuote: false,
            quote: this.props.user.quote
        }
    }


    handleClose = () => {
        this.setState({
            show: false
        })
    }

    handleOpen = () => {
        this.setState({
            show: true
        })
    }

    handleEditOpen = () => {
        console.log('click open')
        this.setState({
            editQuote: true
        })
    }

    handleChangeQuote = (event) => {
        this.setState({
            quote: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newQuote = this.state.quote
        console.log(newQuote)
        axios.put('http://localhost:5000/api/profile/edit', {quote: newQuote }, { withCredentials: true })
        .then(response => 
            this.setState({
                loggedInUser: {
                    ...this.state.loggedInUser,
                    quote: response.data.quote
                },
                editQuote: false,


            }))
        .catch(err =>console.log(err))

    }

    handleFileUpLoad = (event) => {
    const uploadData = new FormData();
    uploadData.append("avatar", event.target.files[0])
    axios.put('http://localhost:5000/api/profile/updateavatar', uploadData, { withCredentials: true }) 
    .then(response => 
        this.setState({
            loggedInUser: {
                ...this.state.loggedInUser,
                avatar: response.data.avatar
            }

        }))
}

    render() {
        console.log("profile state; ", this.state)
        let quote = '';
        let pencil = ''
        if (!this.state.editQuote) {
            quote = <p className="quote">"{this.state.loggedInUser.quote}"</p>
            pencil = <i className="fas fa-pencil-alt" onClick={() => this.handleEditOpen()}></i>

        } else {
            quote = (
                <form onSubmit={(event) => this.handleSubmit(event)} className="form-div-edit">
                    <input
                        type="text"
                        name="quote"
                        placeholder={this.state.loggedInUser.quote}
                        className="quote-input"
                        onChange={(event) => this.handleChangeQuote(event)}
                    />

                    <input type="submit" value="Save" className="save btn" />
                </form>
            )
            pencil = null
        }



        return (
            <div className="container-fluid">
                <div>
                    <div className="row">
                        <Navbar user={this.state.loggedInUser} text='Profile' link='/login' />
                    </div>

                    <div className="row profile-container">
                        <section className="profile-info-div">
                            <div className="col user-data">
                                <img className="profile-picture" src={this.state.loggedInUser.avatar} alt={this.state.loggedInUser.username} />
                                <img className="edit-icon" src="/images/person.png" alt="edit-profile-icon" onClick={() => this.handleOpen()} />
                                <Modal show={this.state.show} aria-labelledby="contained-modal-title-vcenter" centered>
                                    <Modal.Header>
                                        <Modal.Title className="w-100">
                                            <i className="far fa-window-close float-right" onClick={() => this.handleClose()}></i>
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <input
                                            type="file"
                                            id="file"
                                            name="avatar"
                                            onChange={this.handleFileUpLoad}
                                            className="custom-file-input"
                                        />
                                    </Modal.Body>
                                </Modal>
                            </div>

                            <div className="col-8 user-nickname">
                                <Link to="/logout"><i className="fas fa-power-off float-right"></i></Link>
                                <p className="nickname">@{this.state.loggedInUser.username}</p>
                                <div className="d-flex align-items-center">
                                    {quote}
                                    {pencil}
                                </div>
                                <hr></hr>
                            </div>
                        </section>

                        <section className="recipe-book">
                            <h5>My Recipe Book</h5>
                            <hr></hr>
                        </section>



                    </div>

                    {/* <div className="row">
                        <div className="col">
                            <h4 className="bookTitle">My Recipe Book</h4>
                            <hr></hr>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <RecipesBook/>
                            <hr></hr>
                        </div>
                    </div> */}
                </div>
                <div className="row">

                    <Footer user={this.state.loggedInUser} />

                </div>

            </div>
        )
    }
}
