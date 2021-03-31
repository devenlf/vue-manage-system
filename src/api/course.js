import request from '../utils/request';

export const addcourse = query => {
    return request({
        url: 'course/createCourse',
        method: 'post',
        params: {
            ...query
        }
    });
};

export const searchCourseList = query => {
    console.log(query)
    return request({
        url: 'course/queryCoursePageList',
        method: 'get',
        params: {
            ...query
        }
    });
};

export const delCourse = query => {
    return request({
        url: 'course/deleteCourse',
        method: 'post',
        params: {
            ...query
        }
    });
};

export const queryJoinedCourse = query => {
    return request({
        url: 'course/queryJoinedCourse',
        method: 'get',
        params: {
            ...query
        }
    });
};

export const joinCourse = query => {
    return request({
        url: 'course/joinCourse',
        method: 'post',
        params: {
            ...query
        }
    });
};

export const cancelCourse = query => {
    return request({
        url: 'course/cancelCourse',
        method: 'post',
        params: {
            ...query
        }
    });
};