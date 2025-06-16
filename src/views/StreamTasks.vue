<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// @ts-expect-error
import { ElMessage, ElMessageBox } from 'element-plus'
// @ts-expect-error
import { ArrowLeft } from '@element-plus/icons-vue'

// mock 当前连接数和时间
const total = ref(6)
const lastUpdate = ref('2025-06-10 11:16:49')

// mock 客户端连接数据，type区分browser/unity
const allClients = ref([
  { id: 'unity-001', ip: '192.168.0.12', time: '10:21:30', type: 'unity' },
  { id: 'unity-002', ip: '192.168.0.44', time: '10:25:17', type: 'unity' },
  { id: 'unity-003', ip: '10.0.0.18', time: '10:27:59', type: 'unity' },
  { id: 'browser-001', ip: '101.142.141.94', time: '10:26:10', type: 'browser' },
  { id: 'browser-002', ip: '13.231.155.97', time: '10:26:30', type: 'browser' },
  { id: 'browser-003', ip: '154.12.177.46', time: '10:27:10', type: 'browser' },
])

// 分页
const pageSize = 10
const currentPage = ref(1)
const pagedClients = ref<typeof allClients.value>([])

function updatePagedClients() {
  const start = (currentPage.value - 1) * pageSize
  pagedClients.value = allClients.value.slice(start, start + pageSize)
}

function handlePageChange(page: number) {
  currentPage.value = page
  updatePagedClients()
}

// 自动刷新模拟
let timer: any = null
function autoRefresh() {
  lastUpdate.value = new Date().toLocaleString('zh-CN', { hour12: false })
  updatePagedClients()
}
onMounted(() => {
  updatePagedClients()
  timer = setInterval(autoRefresh, 5000)
})
onUnmounted(() => {
  clearInterval(timer)
})

// 中断连接
function disconnectClient(client: any) {
  ElMessageBox.confirm(
    `确认要断开与 ${client.id} 的连接吗？`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    },
  ).then(() => {
    allClients.value = allClients.value.filter(c => c.id !== client.id)
    total.value = allClients.value.length
    updatePagedClients()
    ElMessage.success('已断开连接')
  })
}

const route = useRoute()
const currentServiceName = computed(() => route.query.name || '')
const router = useRouter()
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
    <div v-if="currentServiceName" style="margin-bottom: 16px;">
      <b>当前服务：</b>
      <span style="font-size: 1.1em; color: #007bff;">{{ currentServiceName }}</span>
    </div>
    <div style="margin-bottom: 16px;">
      <b>当前连接数：</b>
      <span style="font-size: 1.2em; color: #007bff;">{{ total }} 个客户端</span>
      <span style="margin-left: 24px; color: #888; font-size: 13px;">更新时间：{{ lastUpdate }}（每 5 秒自动刷新）</span>
    </div>
    <el-table :data="pagedClients" style="width: 100%;">
      <el-table-column prop="id" label="客户端 ID" min-width="120" />
      <el-table-column prop="ip" label="IP 地址" min-width="120" />
      <el-table-column prop="time" label="连接时间" min-width="100" />
      <el-table-column label="操作" width="80">
        <template #default="scope">
          <el-link type="primary" @click="disconnectClient(scope.row)">
            强退
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 16px; text-align: right;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="allClients.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
      <span style="margin-left: 16px; color: #888; font-size: 13px;">
        当前页：第 {{ currentPage }} 页，每页显示：{{ pageSize }} 条连接
      </span>
    </div>
  </el-card>
</template>
