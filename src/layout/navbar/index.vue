<script setup lang='ts'>
import { } from 'vue'
</script>

<template>
  <div class="navbar">
    <div class="navbar-right">
      <el-avatar>user</el-avatar>
    </div>
  </div>
</template>

<style lang='scss'>
.navbar {
  display: flex;
  align-items: center;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  padding: 0 24px;
}
.navbar-right {
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>
