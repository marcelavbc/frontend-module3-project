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
            recipeInfo: {}
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

    getIngredients = (event) => {
        let ingredient = event.target.value.toLowerCase()
        axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${ingredient}&number=5&apiKey=8fe7b3ccbf9c46789a2329e91dd4509c`)
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
        // console.log('param:', param)
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=2&includeIngredients=${param}&addRecipeInformation=true&ignorePantry=true&fillIngredients=true&apiKey=8fe7b3ccbf9c46789a2329e91dd4509c`)
            .then(responseRecipes => {
                console.log('responseRecipes: ', responseRecipes.data.results)
                this.setState({
                    recipes: responseRecipes.data.results,
                    isClicked: !this.state.isClicked,
                })
            })
            .then(() => {
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
                return <Recipes id={ele.id} key={i} title={ele.title} src={ele.image} missed={ele.missedIngredientCount} missing={ele.missedIngredients} minutes={ele.readyInMinutes + '\'' } serving={ele.servings} recipes={ele}/>
            })
        }
        // console.log('state in search', this.state)

        return (
            <div className="profile container">
                <div>
                    <div>
                        <div className="row">
                            <Navbar user={this.state.loggedInUser} text='Search' link='/profile' />
                        </div>
                        <div className="row profile-container mt-3">
                            <div className="col-12">
                                <input
                                    placeholder="Type to search and click to select! "
                                    className="input-search"
                                    type="text"
                                    name="ingredients"
                                    onChange={this.getIngredients}
                                    value={this.state.ingredient}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 border-right">
                                {ingredientSearch}
                            </div>
                            <div className=" col-6">
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

                            {/* <Recipes title="Cinnamon Apple" src="https://spoonacular.com/recipeImages/47950-312x231.jpg" likes='90' missed={3} missing={['suggar', 'Cinnamon']} id={73420} minutes={120 + '\''} serving={3}/>
                            <Recipes title="Cinnamon" src="https://spoonacular.com/recipeImages/47950-312x231.jpg" likes='90' missed='0' missing={['suggar', 'Cinnamon']} />
                            <Recipes title="Cinnam" src="https://spoonacular.com/recipeImages/47950-312x231.jpg" likes='90' missed='2' missing={['suggar', 'Cinnamon']}  /> */}


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
