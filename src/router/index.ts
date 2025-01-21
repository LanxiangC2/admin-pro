import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import { useSettingStore } from '@/store/setting';
import { getTitle } from '@/utils';
import 'nprogress/nprogress.css';

const settingStore = useSettingStore();
// 一些特定的路由配置
const aboutRouter: RouteRecordRaw = {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {},
    children: []
};

// 配置路由
// const routes: Array<RouteRecordRaw> = [{
//     path: '/',
//     name: 'Home',
//     component: () => import('@/views/home/index.vue'),
//     meta: {},
//     children: [],
// }];

const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
    eager: true
});

// 配置路由
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).map((path) => {
    const module = modules[path].default;
    routes.push(module);
});

routes.push(aboutRouter);

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const handleRouters = (currentName: string) => {
    const titles = getTitle(currentName, router.getRoutes());
    console.log('titles', titles);

    settingStore.setTitle(titles);
};
const noStatusPage = ['/login', '/register', '/about'];
router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    handleRouters(_to.name as string);

    const token = sessionStorage.getItem('userInfo');
    console.log(token);
    const userIsLogin = token ? true : false;
    if (userIsLogin || noStatusPage.includes(_to.path)) return next();
    next('/login');
});

router.afterEach((_to) => {
    console.log(_to);
    NProgress.done();
});

export default router;
