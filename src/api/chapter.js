import request from '../utils/request';

export const createChatper = query => {
    return request({
        url: 'chatper/createChatper',
        method: 'post',
        params: {
            ...query
        }
    });
};

export const queryChapterList = query => {
    return request({
        url: 'chatper/queryChapterList',
        method: 'get',
        params: {
            ...query
        }
    });
};


export const queryChapterInfo = query => {
    return request({
        url: 'chatper/queryChapterInfo',
        method: 'get',
        params: {
            ...query
        }
    });
};

