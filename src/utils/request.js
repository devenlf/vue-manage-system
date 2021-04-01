import axios from 'axios';

const service = axios.create({
    headers: {'Content-Type': '	application/json'},
    //baseURL: 'https://yapi.baidu.com/mock/43399/api/',
    baseURL: 'http://127.0.0.1:8080/',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
