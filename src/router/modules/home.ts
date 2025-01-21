export default {
    path: '/',
    name: 'home',
    component: () => import('@/layout/index.vue'),
    meta: {},
    children: [
        {
            path: '/',
            name: 'HomePage',
            component: () => import('@/views/home/index.vue'),
            meta: {
                title: '默认首页',
                isShow: true
            }
        },
        {
            path: '/project',
            name: 'ProjectPage',
            component: () => import('@/views/project/index.vue'),
            meta: {
                title: '项目模块',
                isShow: true
            }
        },
        {
            path: '/user',
            name: 'UserPage',
            component: () => import('@/views/user/index.vue'),
            meta: {
                title: '用户列表',
                isShow: true
            }
        },
        {
            path: '/role',
            name: 'RolePage',
            component: () => import('@/views/role/index.vue'),
            meta: {
                title: '角色列表',
                isShow: true
            }
        },
        {
            path: '/auth',
            name: 'AuthPage',
            component: () => import('@/views/auth/index.vue'),
            meta: {
                title: '权限列表',
                isShow: true
            }
        }
    ]
};
