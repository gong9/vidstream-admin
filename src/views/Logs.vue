<script setup lang="ts">
import { ref } from 'vue'
const logs = ref([
  { time: '2024-06-01 10:00', type: '推流', content: '直播间A开始推流' },
  { time: '2024-06-01 10:05', type: '系统', content: '服务器重启' },
  { time: '2024-06-01 10:10', type: '推流', content: '直播间B断流' },
])
</script>

<template>
  <el-card>
    <h2>日志管理</h2>
    <el-table :data="logs" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="time" label="时间" width="180" />
      <el-table-column prop="type" label="类型" width="100" />
      <el-table-column prop="content" label="内容" />
    </el-table>
  </el-card>
</template>
