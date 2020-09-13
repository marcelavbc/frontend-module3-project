import React, { Component } from 'react'
import Footer from '../footer/Footer'
import axios from 'axios'
import Navbar from '../navbar/Navbar'
import './Search.css'
import Ingredients from '../ingredients/Ingredients'
import IngredientAdded from '../ingredients/IngredientAdded'
import Recipes from '../recipes/Recipes'

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredient: '',
            listAllIngredients: [],
            isClicked: false,
            savedRecipes: this.props.saved
        }
        this.handleClick = this.handleClick.bind(this)
        this.getIngredients = this.getIngredients.bind(this)
    }

    handleChange = (event) => {
        this.setState({
            ingredient: event.target.value.toLowerCase()
        })

    }

    handleClick = (item) => {
        let copyList = this.state.listAllIngredients
        copyList.push(item)
        this.setState({
            listAllIngredients: copyList,
            ingredient: ''
        })
    }

    getSingleRecipe = (recipe) => {
        console.log("get Single called")
        console.log("recipe", recipe)
        // this.setState({
        // })

        // console.log('state:', this.state)
        // this.props.upStaterecipe(this.state.single)
    }


    getIngredients = (event) => {
        let ingredient = event.target.value.toLowerCase()

        axios({
            "method": "GET",
            "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_KEY_SPOONCULAR_API_KEY,
                "useQueryString": true
            }, "params": {
                "number": "5",
                "query": ingredient
            }
        })
            .then(responseFromApi => {
                this.setState({
                    data: responseFromApi.data,
                    ingredient: ingredient
                })
            })
    }

    deleteItem = (item) => {
        // console.log('item to delete: ', item)
        const copyAllIngredients = this.state.listAllIngredients
        const index = copyAllIngredients.indexOf(item)
        if (index > -1) {
            copyAllIngredients.splice(index, 1)
        }
        this.setState({
            listAllIngredients: copyAllIngredients,
        })
    }

    letsCook = () => {
        let param = this.state.listAllIngredients.toString()
        let idsToShow = []
        console.log('param:', param)
        axios({
            "method": "GET",
            "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "3ae8633d0fmshea232df942d8d7bp19b871jsn75705b922f90",
                "useQueryString": true
            }, "params": {
                "number": "15",
                "ranking": "1",
                "ignorePantry": "false",
                "ingredients": param
            }
        })

            .then((response) => {
                response.data.map(ele => {
                    idsToShow.push(ele.id)
                })
                console.log('idsToShow', idsToShow.toString())
                axios({
                    "method": "GET",
                    "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk",
                    "headers": {
                        "content-type": "application/octet-stream",
                        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                        "x-rapidapi-key": "3ae8633d0fmshea232df942d8d7bp19b871jsn75705b922f90",
                        "useQueryString": true
                    }, "params": {
                        "ids": idsToShow.toString()
                    }
                })
                    .then((responseRecipes) => {
                        console.log('response api', responseRecipes)
                        this.setState({
                            recipes: responseRecipes.data,
                            isClicked: !this.state.isClicked,
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    })

            })
            .then(() => {
                console.log('this.state.recipes: ', this.state.recipes)
                // const copyRecipe = this.state.recipes
                const copyIngredients = this.state.listAllIngredients
                // this.props.liftUpRecipesSearched(copyRecipe)
                this.props.ingredients(copyIngredients)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    render() {
        let ingredientSearch;
        if (this.state.data) {
            ingredientSearch = this.state.data.map((ele, i) => {
                return <Ingredients key={ele.name} item={ele.name} photo={ele.image} addIndredients={this.handleClick} />
            })
        }

        let selectedTittle = '';
        if (this.state.listAllIngredients.length > 0) {
            selectedTittle = <p className="selected">Cook with...</p>
        }


        let list;
        if (this.state.listAllIngredients.length > 0) {
            list = this.state.listAllIngredients.map((ele, i) => {
                return <IngredientAdded key={i} item={ele} deleteItem={this.deleteItem} />
            })
        }

        let cookButton;
        if (this.state.listAllIngredients.length > 2) {
            cookButton =
                <button className="btn btn-letscook" type="submit" onClick={this.letsCook}>
                    Let's Cook!
                </button>
        }
        let listRecipes;
        if (this.state.isClicked) {
            // console.log('recipes to map:', this.state.recipes)
            listRecipes = this.state.recipes.map((ele, i) => {
                console.log('ele in search', ele)
                return <Recipes id={ele.id} key={i} title={ele.title} src={ele.image} missed={ele.missedIngredientCount} usedIngredients={ele.extendedIngredients} minutes={ele.readyInMinutes + '\''} serving={ele.servings} recipes={ele} saved={this.state.savedRecipes} user={this.props.user} showSavedRecipes={this.props.showSavedRecipes} />
            })
        }

        return (
            <div className="container-fluid">
                <div className="mb-5 mt-1">
                    <div className="row">
                        <Navbar user={this.state.loggedInUser} text='Search' link='/profile' />
                    </div>
                    <div>
                        <div className="row mt-5">
                            <div className="col-12 input-type-search text-center">
                                <p><input
                                    placeholder="Type to search and click to select!"
                                    autoComplete="off"
                                    className="input-search"
                                    type="text"
                                    name="ingredients"
                                    onChange={this.getIngredients}
                                    value={this.state.ingredient}
                                /></p>

                            </div>
                        </div>
                        <div className="row search-main">
                            <div className="col col-md-3">
                                {ingredientSearch}
                            </div>
                            <div className="col col-md-3">
                                {selectedTittle}
                                {list}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col cookButton-div">
                                {cookButton}
                            </div>
                        </div>
                        <div className="row recipe-box">
                            {listRecipes}
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
