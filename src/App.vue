<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <routerView />
  </el-config-provider>
</template>
<style lang="scss" scoped></style>
