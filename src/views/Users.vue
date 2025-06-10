<script setup lang="ts">
import { ref } from 'vue'
const users = ref([
  { id: 1, username: 'admin', role: '管理员' },
  { id: 2, username: 'user1', role: '普通用户' },
  { id: 3, username: 'user2', role: '普通用户' },
])
</script>

<template>
  <el-card>
    <h2>用户管理</h2>
    <el-table :data="users" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="role" label="角色" />
    </el-table>
  </el-card>
</template>
