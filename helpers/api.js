import axios from 'axios';

const Request = axios.create({
    baseURL: 'https://sleepy-scrubland-45052.herokuapp.com/api'
})

export default Request;
