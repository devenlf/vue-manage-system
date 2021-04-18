import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/course'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/course",
                name: "course",
                meta: {
                    title: '课程管理'
                },
                component: () => import (
                "../views/Course.vue")
            },
            {
                path: "/lessonInfo",
                name: "lessonInfo",
                meta: {
                    title: '课程详情'
                },
                component: () => import (
                "../views/LessonInfo.vue")
            },
            {
                path: "/courseT",
                name: "courseT",
                meta: {
                    title: '课程管理'
                },
                component: () => import (
                /* webpackChunkName: "course" */
                "../views/CourseT.vue")
            },
            {
                path: "/workT",
                name: "workT",
                meta: {
                    title: '作业-老师'
                },
                component: () => import (
                /* webpackChunkName: "course" */
                "../views/workT.vue")
            },
            {
                path: "/work",
                name: "work",
                meta: {
                    title: '作业-学生'
                },
                component: () => import (
                /* webpackChunkName: "course" */
                "../views/work.vue")
            },
            {
                path: "/lesson",
                name: "lesson",
                meta: {
                    title: '课时管理'
                },
                component: () => import (
                /* webpackChunkName: "course" */
                "../views/Lesson.vue")
            },
            //  {
            //     path: "/table",
            //     name: "BaseTable",
            //     meta: {
            //         title: '表格'
            //     },
            //     component: () => import (
            //     /* webpackChunkName: "table" */
            //     "../views/BaseTable.vue")
            // },
            {
                    path: "/upload",
                    name: "Upload",
                    meta: {
                        title: '上传插件'
                    },
                    component: () => import (
                    /* webpackChunkName: "upload" */
                    "../views/Upload.vue")
                }, 
            {
                path: "/lessonDetails",
                name: "lessonDetails",
                meta: {
                    title: '课时详情'
                },
                component: () => import (
                /* webpackChunkName: "course" */
                "../views/LessonDetails.vue")
            },
            {
                path: "/admin",
                name: "admin",
                meta: {
                    title: '管理员'
                },
                component: () => import (
                /* webpackChunkName: "charts" */
                "../views/Admin.vue")
            },
            {
                path: "/adminCourse",
                name: "adminCourse",
                meta: {
                    title: '管理员'
                },
                component: () => import (
                /* webpackChunkName: "charts" */
                "../views/adminCourse.vue")
            },
            {
                path: "/ChangeInfo",
                name: "ChangeInfo",
                meta: {
                    title: '修改信息'
                },
                component: () => import (
                /* webpackChunkName: "charts" */
                "../views/ChangeInfo.vue")
            },
            //  {
            //     path: "/charts",
            //     name: "BaseCharts",
            //     meta: {
            //         title: '图表'
            //     },
            //     component: () => import (
            //     /* webpackChunkName: "charts" */
            //     "../views/BaseCharts.vue")
            // }, {
            //     path: "/form",
            //     name: "BaseForm",
            //     meta: {
            //         title: '表单'
            //     },
            //     component: () => import (
            //     /* webpackChunkName: "form" */
            //     "../views/BaseForm.vue")
            // }, {
            //     path: "/tabs",
            //     name: "Tabs",
            //     meta: {
            //         title: 'tab标签'
            //     },
            //     component: () => import (
            //     /* webpackChunkName: "tabs" */
            //     "../views/Tabs.vue")
            // }, {
            //     path: "/map",
            //     name: "Map",
            //     meta: {
            //         title: '地图'
            //     },
            //     component: () => import (
            //     /* webpackChunkName: "donate" */
            //     "../views/Map.vue")
            // },
            //  {
            //     path: "/permission",
            //     name: "Permission",
            //     meta: {
            //         title: '权限管理',
            //         permission: true
            //     },
            //     component: () => import (
            //     /* webpackChunkName: "permission" */
            //     "../views/Permission.vue")
            // }, {
            //     path: "/i18n",
            //     name: "I18n",
            //     meta: {
            //         title: '国际化语言'
            //     },
            //     component: () => import (
            //     /* webpackChunkName: "i18n" */
            //     "../views/I18n.vue")
            // }, {
            //     path: "/upload",
            //     name: "Upload",
            //     meta: {
            //         title: '上传插件'
            //     },
            //     component: () => import (
            //     /* webpackChunkName: "upload" */
            //     "../views/Upload.vue")
            // }, {
            //     path: "/icon",
            //     name: "Icon",
            //     meta: {
            //         title: '自定义图标'
            //     },
            //     component: () => import (
            //     /* webpackChunkName: "icon" */
            //     "../views/Icon.vue")
            // }, 
            {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */
                '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */
                '../views/403.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import (
        /* webpackChunkName: "login" */
        "../views/Login.vue")
    },
    {
        path: "/register",
        name: "Register",
        meta: {
            title: '注册'
        },
        component: () => import (
        /* webpackChunkName: "login" */
        "../views/Register.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | vue-manage-system`;
//     const role = localStorage.getItem('ms_username');
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permission) {
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin'
//             ? next()
//             : next('/403');
//     } else {
//         next();
//     }
// });

export default router;