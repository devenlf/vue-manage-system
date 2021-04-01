import request from '../utils/request';

export const queryTeachersPage = query => {
    console.log(query)
    return request({
        url: 'user/queryTeachersPage',
        method: 'get',
        params: {
            ...query
        }
    });
};

export const pass = query => {
    return request({
        url: 'user/reviewUser',
        method: 'post',
        data: query
    });
};

export const deleteA = query => {
    return request({
        url: 'user/deleteTeacher',
        method: 'post',
        data: query
    });
};


