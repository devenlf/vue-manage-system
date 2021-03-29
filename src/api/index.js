import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};


export const register = query => {
    return request({
        url: 'user/registerUser',
        method: 'post',
        params: query
    });
};

export const login = query => {
    return request({
        url: 'user/loginUser',
        method: 'post',
        params: query
    });
};

export const addTeacherexport = query => {
    return request({
        url: 'user/addTeacherexport',
        method: 'post',
        params: query
    });
};