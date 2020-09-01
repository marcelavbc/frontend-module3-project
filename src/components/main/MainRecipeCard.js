import React, { Component } from 'react';


export default class MainRecipeCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: false,
            loggedInUser: this.props.logged
        }
    }

    save = () => {
        console.log('saved')
        this.setState({
            saved: !this.state.saved
        })
    }

    render() {

        console.log(this.state)
        return (
            <div className="col-6 mt-2 d-flex ">
                <div className="main-card card">
                    <div className="top-card-main">
                        <img className="avatar-main" src={this.props.avatar} alt={this.props.username} />
                        <p className="main-card-user">{'@' + this.props.username}</p>
                    </div>

                    <img className="recipe-image-main" src={this.props.src} alt={this.props.title} />
                    <div className="card-body main-recipe-description">
                        <p className="recipe-title-main text-center">{this.props.title}</p>
                        <div className="main-icons">
                            <p><i className="icon-main fas fa-utensils mr-2"></i>4</p>
                            <p><i className="icon-main far fa-clock mr-2"></i>60 min</p>
                            {/* <p><i className={this.state.saved ? "icon-main fas fa-bookmark" : "icon-main far fa-bookmark"} onClick={this.save}></i></p> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
