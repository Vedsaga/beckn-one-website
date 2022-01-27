import axios from 'axios';


export default axios.create({
    baseURL:'https://beckn-one.succinct.in',
    headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',
        // if this.$store.getters.getToken is not empty then add the token to the header
        'ApiKey':`${localStorage.getItem('token')}`
    }

});