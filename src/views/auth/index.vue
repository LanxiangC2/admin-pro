<template>
    <div>
        <el-tree
            ref="treeRef"
            :data="authList"
            :check-strictly="true"
            show-checkbox
            :default-checked-keys="checkedNode"
            node-key="roleId"
            :props="{ label: 'name', children: 'roleList' }"
        />
        <el-button type="primary" @click="onChangeAuth">修改权限</el-button>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAuthList } from '@/api/auth';
import { IAuth } from '@/types/common';

const route = useRoute();

const treeRef = ref<any>(null);
let authList = ref<IAuth[]>([]);
const checkedNode = ref<string[]>([]);
const { query } = route;
if (query.auth) {
    checkedNode.value = query.auth as string[];
}
onMounted(() => {
    getAuthList()
        .then((res) => {
            authList.value = res.data;
        })
        .catch((err) => {});
});
const onChangeAuth = () => {
    console.log(treeRef.value);
    const selectedTreeNode = treeRef.value.getCheckedNodes();
    console.log(selectedTreeNode);
    console.log(treeRef.value.getCheckedKeys());
};
</script>
