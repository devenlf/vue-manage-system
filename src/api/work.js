import request from '../utils/request';

export const createWork = query => {
    return request({
        url: 'work/createWork',
        method: 'post',
        params: {
            ...query
        }
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
        params: {
            ...query
        }
    });
};

export const queryDoneHomeWork = query => {
    return request({
        url: 'work/queryDoneHomeWork',
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
        params: {
            ...query
        }
    });
};