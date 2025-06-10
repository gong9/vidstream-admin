<script setup lang="ts">
import { ref } from 'vue'
const form = ref({
  url: 'rtmp://example.com/live',
  bandwidth: 500,
  autoReconnect: true,
})
</script>

<template>
  <el-card>
    <h2>系统设置</h2>
    <el-form label-width="120px" style="margin-top: 20px; max-width: 400px;">
      <el-form-item label="推流地址">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="最大带宽(Mbps)">
        <el-input v-model="form.bandwidth" type="number" />
      </el-form-item>
      <el-form-item label="自动重连">
        <el-switch v-model="form.autoReconnect" />
      </el-form-item>
    </el-form>
  </el-card>
</template>
