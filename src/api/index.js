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
        data: query
    });
};

export const login = query => {
    return request({
        url: 'user/loginUser',
        method: 'post',
        data: query
    });
};

export const addTeacher = query => {
    return request({
        url: 'user/addTeacher',
        method: 'post',
        data: query
    });
};