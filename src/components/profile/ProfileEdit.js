import React, { Component } from 'react'
import Navbar from '../navbar/Navbar';
import axios from 'axios'

export default class ProfileEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: this.props.user,
            avatar: this.props.user.avatar, 
            about: ''
        }
    }

    handleFileUpLoad = (event) => {
        console.log("file upload...")
        const uploadData = new FormData()
        uploadData.append("avatar", event.target.files[0])
        axios.post('http://localhost:5000/api/upload', uploadData) //sobe a foto
            .then(response => {
                console.log("file uploaded sucessfully", response.data)
                axios.put('http://localhost:5000/api/edit', { avatar: response.data.path }, { withCredentials: true })//atualiza foto
                    .then(() => {
                        console.log("resposta: ", response.data)
                        this.setState({ //atualiza foto no state do componente. 
                            avatar: response.data.path
                        })
                        //atualizar o estado no componente pai para que conheça nova foto
                        //obter objeto do usuário atual => this.props.user
                        //criar cópia do objeto
                        //mudar imagem da cópia 
                        //chamar callback que vai atualizar estado no pai
                        const copyUser = { ...this.props.user }
                        console.log('user:', this.props.user)
                        copyUser.avatar = response.data.path
                        console.log('Copyuser:', copyUser)
                        this.props.getUser(copyUser)
                    })
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log('state' , this.state.about)
    }

    render() {
        console.log('edit page props: ', this.props)
        return (
            <div className="profile container back">
                <div>
                    <div className="row">
                        <Navbar user={this.state.loggedInUser} text='Edit' link='/profile'/>
                    </div>

                    <div className="row profile-container">
                        <form className="w-100 edit-form">
                            <div className="form-group photo">
                                <img className="profile-picture edit-photo" src={this.state.avatar} alt={this.state.loggedInUser.username} />
                                <div className="">
                                    <input
                                        type="file"
                                        id="file"
                                        name="avatar"
                                        onChange={this.handleFileUpLoad}
                                    />
                                    <label htmlFor="file" className="btn-2">Change photo</label>
                                </div>
                            </div>
                            <div className="form-grout">
                                
                            </div>

                        </form>
                    </div>
                </div>






                <div>
                    <div className="row">

                        <Navbar user={this.state.loggedInUser} />
                        {/* <div className="row">
                
                    <Footer user={this.props.user} />
                </div> */}
                    </div>
                </div>

            </div>
        )
    }
}
