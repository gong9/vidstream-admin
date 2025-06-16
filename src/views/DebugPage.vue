<script setup lang="ts">
import { useRouter } from 'vue-router'
// @ts-expect-error
import { ArrowLeft } from '@element-plus/icons-vue'
const router = useRouter()
// 这里可以添加调试相关的逻辑
</script>

<template>
  <el-card>
    <div style="display: flex; justify-content: flex-end; margin-bottom: 16px;">
      <el-button
        type="primary"
        size="large"
        style="font-weight: bold;"
        @click="router.push('/service-manager')"
      >
        <el-icon style="vertical-align: middle; margin-right: 4px;">
          <ArrowLeft />
        </el-icon>
        返回
      </el-button>
    </div>
    <h2>调试页面</h2>
    <div>这里是调试页面内容。</div>
  </el-card>
</template>
