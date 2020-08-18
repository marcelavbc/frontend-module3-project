import axios from 'axios';
//will contain all the methods
class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        });
        this.service = service;
    }

    //We will receive the username and password from the component and request the http://localhost:5000/api/signup URL. 
    // The second argument inside this post request is the data we are sending to server. 
    // When receiving the response, we will pass it to the component.
    signup = (username, password, email) => {
        return this.service.post('/signup', { username, password, email })
            .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/loggedin')
            .then(response => response.data)
    }

    login = (username, password) => {
        return this.service.post('/login', { username, password })
            .then(response => response.data)
    }

    logout = () => {
        return this.service.post('/logout', {})
            .then(response => response.data)
    }
}

export default AuthService;