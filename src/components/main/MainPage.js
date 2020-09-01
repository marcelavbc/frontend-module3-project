import React, { Component } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import axios from 'axios'
import MainRecipeCard from './MainRecipeCard'
import './Main.css'

export default class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: this.props.user,
            
        }

    }

    getAllrecipes = () => {
        axios.get('http://localhost:5000/api/recipes/all')
            .then(response => {
                this.setState({
                    allRecipes: response.data
                })
                console.log('response: ', response.data)
            })
    }

    componentDidMount() {
        this.getAllrecipes()
    }

    render() {
        let cards;
        if (this.state.allRecipes) {
            console.log(this.state.allRecipes)
            cards = this.state.allRecipes.slice(0).reverse().map((ele, i) => {
                return <MainRecipeCard key={i} title={ele.title} username={ele.owner.username} avatar={ele.owner.avatar} src={ele.imagePath} id={ele._id} logged={this.state.loggedInUser} />
            })
        }
        console.log('state in MainPage', this.state)
        return (
            <div className="container-fluid">
                <div>
                    <div className="row">
                        <Navbar user={this.props.loggedInUser} text="What's new?" link='/profile' />
                    </div>
                    <div className="row mb-5  mt-5">
                            {cards}
                    </div>
                </div>
                
                <div className="row">

                    <Footer user={this.state.loggedInUser} />

                </div>

            </div>
        )
    }
}
