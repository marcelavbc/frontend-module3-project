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
        //     single: 'hello'
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
        console.log('param:', param)


        axios({
            "method": "GET",
            "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_KEY_SPOONCULAR_API_KEY,
                "useQueryString": true
            }, "params": {
                "addRecipeInformation": "true",
                "instructionsRequired": "true",
                "number": "12",
                "includeIngredients": param,
                "fillIngredients": "true",
            }
        })
            .then(responseRecipes => {
                console.log('responseRecipes: ', responseRecipes.data)
                console.log('responseRecipes results: ', responseRecipes.data.results)
                this.setState({
                    recipes: responseRecipes.data.results,
                    isClicked: !this.state.isClicked,
                })

            })
            .then(() => {
                console.log('this.state.recipes: ', this.state.recipes)

                const copyRecipe = this.state.recipes
                const copyIngredients = this.state.listAllIngredients
                this.props.liftUpRecipesSearched(copyRecipe)
                this.props.ingredients(copyIngredients)
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
                return <Recipes id={ele.id} key={i} title={ele.title} src={ele.image} missed={ele.missedIngredientCount} missing={ele.missedIngredients} minutes={ele.readyInMinutes + '\''} serving={ele.servings} recipes={ele} />
            })
        }

        return (
            <div className="container-fluid">
                <div>
                    <div className="row">
                        <Navbar user={this.state.loggedInUser} text='Search' link='/profile' />
                    </div>
                    <div>
                        <div className="row mt-3">
                            <div className="col-12 input-type-search text-center">
                                <p><input
                                    placeholder="Type to search and click to select! "
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
                            {/* <Recipes title="Cinnamon something else just to opopo" src="https://spoonacular.com/recipeImages/47950-312x231.jpg" likes='90' missed={3} missing={['suggar', 'Cinnamon']} id={73420} minutes={120 + '\''} serving={3} infoClicked={this.getSingleRecipe} />
                            <Recipes title="Cinnamon something else just to test" src="https://spoonacular.com/recipeImages/47950-312x231.jpg" likes='90' missed={3} missing={['suggar', 'Cinnamon']} id={73420} minutes={120 + '\''} serving={3} infoClicked={this.getSingleRecipe} />
                            <Recipes title="Cinnamon Apple bla bla bla bla and something else just to test" src="https://spoonacular.com/recipeImages/47950-312x231.jpg" likes='90' missed={3} missing={['suggar', 'Cinnamon']} id={73420} minutes={120 + '\''} serving={3} infoClicked={this.getSingleRecipe}/>
                            <Recipes title="X-Salad Burguer" src="https://spoonacular.com/recipeImages/stuffed-bacon-cheddar-bbq-burger-2-98388.jpg" likes='90' missed='2' missing={['suggar', 'Cinnamon']} infoClicked={this.getSingleRecipe}/>
                            <Recipes title="X-Salad Burguer" src="https://spoonacular.com/recipeImages/stuffed-bacon-cheddar-bbq-burger-2-98388.jpg" likes='90' missed='2' missing={['suggar', 'Cinnamon']} />
                            <Recipes title="X-Salad Burguer" src="https://spoonacular.com/recipeImages/stuffed-bacon-cheddar-bbq-burger-2-98388.jpg" likes='90' missed='2' missing={['suggar', 'Cinnamon']} />
                            <Recipes title="Cinnamon Apple" src="https://spoonacular.com/recipeImages/47950-312x231.jpg" likes='90' missed={3} missing={['suggar', 'Cinnamon']} id={73420} minutes={120 + '\''} serving={3} />
                            <Recipes title="Cinnamon Apple" src="https://spoonacular.com/recipeImages/47950-312x231.jpg" likes='90' missed={3} missing={['suggar', 'Cinnamon']} id={73420} minutes={120 + '\''} serving={3} />
                            <Recipes title="Cinnamon Apple" src="https://spoonacular.com/recipeImages/47950-312x231.jpg" likes='90' missed={3} missing={['suggar', 'Cinnamon']} id={73420} minutes={120 + '\''} serving={3} />
                            <Recipes title="Cinnamon Apple" src="https://spoonacular.com/recipeImages/47950-312x231.jpg" likes='90' missed={3} missing={['suggar', 'Cinnamon']} id={73420} minutes={120 + '\''} serving={3} />
                            <Recipes title="Cinnamon Apple" src="https://spoonacular.com/recipeImages/47950-312x231.jpg" likes='90' missed={3} missing={['suggar', 'Cinnamon']} id={73420} minutes={120 + '\''} serving={3} />
                            <Recipes title="Jalapeño Burger" src="https://spoonacular.com/recipeImages/jalapeno-burger-2-98730.jpg" likes='90' missed='0' missing={['suggar', 'Cinnamon']} /> */}
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
