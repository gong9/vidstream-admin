<script setup lang="ts">
// 仪表盘页面
</script>

<template>
  <div>
    <el-card>
      <h2>推流服务器后台管理系统</h2>
      <p>欢迎使用！</p>
    </el-card>
    <div style="margin-top: 20px; display: flex; gap: 20px;">
      <el-card style="flex:1;">
        <div>在线推流数</div>
        <div style="font-size: 2em;">
          12
        </div>
      </el-card>
      <el-card style="flex:1;">
        <div>服务器带宽(Mbps)</div>
        <div style="font-size: 2em;">
          320
        </div>
      </el-card>
      <el-card style="flex:1;">
        <div>异常流数</div>
        <div style="font-size: 2em; color: red;">
          1
        </div>
      </el-card>
    </div>
  </div>
</template>
