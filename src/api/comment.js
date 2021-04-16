import request from '../utils/request';

export const sumitComment = query => {
    return request({
        url: 'comment/sumitComment',
        method: 'post',
        data: query
    });
};

export const queryComments = query => {
    return request({
        url: 'comment/queryComments',
        method: 'get',
        params: {
            ...query
        }
    });
};


export const answerComment = query => {
    return request({
        url: 'comment/answerComment',
        method: 'post',
        data: query
    });
};

