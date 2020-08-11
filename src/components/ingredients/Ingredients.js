import React, { Component } from 'react'


const food = [{
    name: "Potato",
    image: "https://i.imgur.com/hGraGyR.jpg",

},
{
    name: "Almonds",
    image: "https://i.imgur.com/JRp4Ksx.jpg",
},
{
    name: "Bacon",
    image: "https://i.imgur.com/7GlqDsG.jpg",
},
{
    name: "Bread",
    image: "https://i.imgur.com/TsWzMfM.jpg",
},
{
    name: "Orange",
    image: "https://i.imgur.com/abKGOcv.jpg",
},
{
    name: "Banana",
    image: "https://i.imgur.com/BMdJhu5.jpg",
},
{
    name: "Yogurt",
    image: "https://i.imgur.com/URhdrAm.png",
}
]; 

export default class Ingredients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            food: food
        }
    }

    render() {
        console.log(this.state.food)
        const foodList = this.state.food
        let element = foodList.map((ele, i) => {
            return (
                <div className="card" key={i}>
                <img className="card-img-top" src={ele.image} alt={ele.name} />
                <div className="card-body">
                    <p className="card-text">{ele.name}</p>
                </div>
            </div>
            )
        })
        return (
            
            <div >
                {element}
            </div>

        )
    }
}
