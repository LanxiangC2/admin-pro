<template>
    <div class="wrap-about">
        <MyTag :text="text" :theme="theme" />
        <MyTag :text="text" :theme="theme" />
        <MyTag :text="text" :theme="theme" />
        <MyTag :text="text" :theme="theme" />
    </div>
</template>

<script setup lang="ts">
const text = 'lyric';
const theme = 'black';
</script>

<style lang="less" scoped>
.wrap-about {
    color: @color;
    background-color: @bgColor;
}
</style>
