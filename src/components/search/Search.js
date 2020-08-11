import React, { Component } from 'react'
import Footer from '../footer/Footer'
import { Link } from 'react-router-dom'
import './Search.css'
import Ingredients from '../ingredients/Ingredients'
import SearchBar from './Searchbar'


export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            params: this.props.match.params
        }
        this.getIngredients = this.getIngredients.bind(this)
    }

    filter = text => {
        this.setState({
            params: text
        });
    };

    getIngredients = () => {
        // const params = this.state.params
        // axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${params}&number=5&apiKey=8fe7b3ccbf9c46789a2329e91dd4509c`)
        //     .then(responseFromApi => {
        //         const data = responseFromApi
        //         console.log(responseFromApi)
        //         this.setState(data)
        //     })
    }

    render() {
        console.log(this.state.data)
        return (
            <div className="search-page" >
            {/* {this.getIngredients()} */}
                <div>
                    <nav className="navbar">
                        <Link to="/profile"><i className="fas fa-chevron-left"></i></Link>
                        <p>Cook!</p>
                        <img className="profile-picture" src={this.props.user.avatar} width="30" height="30" alt="" />
                    </nav>
                    <SearchBar callback={this.filter} />
                    <div className="row mt-4 mx-3">
                        <div className="col box mx-3">
                            <Ingredients />
                        </div>
                        <div className="col box mx-3">
                            <p></p>
                        </div>
                        <button className="btn col-12 mt-3">Cook!</button>
                    </div>
                </div>
                <Footer user={this.props.user} />
            </div>
        )
    }
}
