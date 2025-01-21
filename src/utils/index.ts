import { RouteRecordNormalized } from 'vue-router';

/**
 * @param name 当前路由名称
 * @param routes
 * @returns
 */
export function getTitle(name: string, routes: RouteRecordNormalized[]) {
    const names: string[] = [];
    while (true) {
        names.push(name);
        const currentRouteObj = routes.find((route) => route.name === name);
        const parentNameObj = routes.find((route) => route.name === currentRouteObj?.meta?.parentRouter);
        if (parentNameObj) {
            name = parentNameObj.name as string;
            continue;
        } else {
            break;
        }
    }
    return names.reverse();
}
