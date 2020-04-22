import axios from 'axios';

const Request = axios.create({
    // baseURL: 'https://sleepy-scrubland-45052.herokuapp.com/api'
    baseURL: 'http://localhost:3000/api'
})

export default Request;
