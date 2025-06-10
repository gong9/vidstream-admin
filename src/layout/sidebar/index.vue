<script setup lang='ts'>
import { onMounted, ref, watchPostEffect } from 'vue'
import { useRoute } from 'vue-router'
import injectionJs2Css from '../../utils/injectionJs2Css'
const props = defineProps({
  sidebarBackgroundColor: {
    type: String,
    required: true,
  },
})

const sidebarRef = ref<HTMLDivElement | null>(null)
const route = useRoute()

watchPostEffect(() => {
  injectionJs2Css(
    (sidebarRef.value as HTMLDivElement),
    {
      backgroundColor: props.sidebarBackgroundColor,
    },
  )
})
</script>

<template>
  <div ref="sidebarRef" class="sidebar">
    <div class="sidebar-logo">
      推流管理
    </div>
    <el-menu
      :default-active="route.path"
      class="el-menu-vertical-demo"
      background-color="transparent"
      router
    >
      <el-menu-item index="/dashboard">
        仪表盘
      </el-menu-item>
      <el-menu-item index="/stream-tasks">
        监控管理
      </el-menu-item>
      <el-menu-item index="/logs">
        日志管理
      </el-menu-item>
      <!-- <el-menu-item index="/settings">
          系统设置
        </el-menu-item> -->
      <el-menu-item index="/users">
        用户管理
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang='scss'>
@import './index.scss';
</style>
