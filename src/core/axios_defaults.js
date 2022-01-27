import axios from 'axios';

axios.defaults.baseURL = 'https://beckn-one.succinct.in';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.get['ApiKey'] = this.$store.getters.getToken;
axios.defaults.headers.post['Content-Type'] = 'application/json';