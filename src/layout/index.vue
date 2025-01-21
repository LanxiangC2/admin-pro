<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-active="activeMenu" :ellipsis="false" router>
                    <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
                        <span>{{ item.meta.title }}</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="/">项目介绍</el-menu-item>
                    <el-menu-item index="/user"> 用户列表 </el-menu-item>
                    <el-menu-item index="/role"> 角色列表 </el-menu-item>
                    <el-menu-item index="/auth"> 权限列表 </el-menu-item> -->
                </el-menu>
            </el-aside>
            <el-main>
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
                    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
                    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
                </el-breadcrumb>

                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import Header from './components/Header.vue';
import { ArrowRight } from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();

const menuList = router.getRoutes().filter((route) => {
    return route.meta.isShow;
});
const activeMenu = route.path;
</script>
<style scoped lang="less">
.el-header {
    padding: 0;
    margin-bottom: 5px;
}

.el-container {
    height: 100%;

    .el-menu {
        height: 100%;
    }
}

.el-breadcrumb {
    margin-bottom: 10px;
}
</style>
