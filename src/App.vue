<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <el-button type="primary">button</el-button>
  </el-config-provider>
</template>
