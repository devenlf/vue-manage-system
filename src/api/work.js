import request from '../utils/request';

export const createWork = query => {
    return request({
        url: 'work/createWork',
        method: 'post',
        data: query,
    });
};

export const queryWorksPage = query => {
    return request({
        url: 'work/queryWorksPage',
        method: 'get',
        params: {
            ...query
        }
    });
};

export const doHomeWork = query => {
    return request({
        url: 'work/doHomeWork',
        method: 'post',
        data: query
    });
};

export const queryDoneHomeWork = query => {
    return request({
        url: 'work/queryDoneHomeWorkPage',
        method: 'get',
        params: {
            ...query
        }
    });
};

export const reviewHomeWork = query => {
    return request({
        url: 'work/reviewHomeWork',
        method: 'post',
        data: query
    });
};