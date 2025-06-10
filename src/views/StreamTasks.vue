<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// @ts-expect-error
import { ElMessage, ElMessageBox } from 'element-plus'

// mock 总连接数和时间
const total = ref(10)
const lastUpdate = ref('2025-06-10 11:16:49')

// mock 会话数据
const allClients = ref([
  { id: '819d52a4627c4c3b...', username: 'admin', nickname: '管理员', dept: '研发部', ip: '103.142.141.94', location: '日本东京都东京', browser: 'Chrome 137', time: '2025-06-10 11:16:49' },
  { id: '45e25873b2194428...', username: 'admin', nickname: '管理员', dept: '研发部', ip: '13.231.155.97', location: '日本东京都东京', browser: 'Chrome 137', time: '2025-06-10 10:59:47' },
  { id: 'a43301bebf544d5b...', username: 'admin', nickname: '管理员', dept: '研发部', ip: '154.12.177.46', location: '美国弗吉尼亚阿什本', browser: 'MSEdge 137', time: '2025-06-10 10:52:50' },
  { id: '1e2127aee02b49c6...', username: 'admin', nickname: '管理员', dept: '研发部', ip: '125.34.221.102', location: '中国北京北京市', browser: 'Chrome 136', time: '2025-06-10 10:51:01' },
  { id: '0b8018716d93481...', username: 'admin', nickname: '管理员', dept: '研发部', ip: '183.148.93.16', location: '中国浙江省台州市', browser: 'Chrome 131', time: '2025-06-10 10:50:30' },
  { id: 'aea80fb462f743dc...', username: 'admin', nickname: '管理员', dept: '研发部', ip: '110.87.82.142', location: '中国福建省厦门市', browser: 'MSEdge 137', time: '2025-06-10 10:49:40' },
  { id: 'af43393a499a422e...', username: 'admin', nickname: '管理员', dept: '研发部', ip: '202.104.140.52', location: '中国广东省深圳市', browser: 'Firefox 139.0', time: '2025-06-10 10:47:41' },
  { id: '22679d86bd9448e...', username: 'admin', nickname: '管理员', dept: '研发部', ip: '58.246.191.50', location: '中国上海上海市', browser: 'Chrome 137', time: '2025-06-10 10:45:21' },
  { id: '731491075ee7483a...', username: 'admin', nickname: '管理员', dept: '研发部', ip: '172.236.140.89', location: '美国马萨诸塞', browser: 'Chrome 128', time: '2025-06-10 10:36:13' },
  { id: '46ae5a98cc3c476e...', username: 'admin', nickname: '管理员', dept: '研发部', ip: '115.236.50.17', location: '中国浙江省杭州市', browser: 'Chrome 136', time: '2025-06-10 10:32:50' },
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

// 强退
function disconnectClient(client: any) {
  ElMessageBox.confirm(
    `确认要强退会话 ${client.id} 吗？`,
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
    ElMessage.success('已强退')
  })
}
</script>

<template>
  <el-card>
    <h2>监控管理</h2>
    <div style="margin-bottom: 16px;">
      <b>当前连接数：</b>
      <span style="font-size: 1.2em; color: #007bff;">{{ total }} 个</span>
      <span style="margin-left: 24px; color: #888; font-size: 13px;">更新时间：{{ lastUpdate }}（每 5 秒自动刷新）</span>
    </div>
    <el-table :data="pagedClients" style="width: 100%;">
      <el-table-column type="selection" width="48" />
      <el-table-column prop="id" label="连接编号" min-width="160" />
      <el-table-column prop="username" label="用户名" min-width="80" />
      <el-table-column prop="nickname" label="用户昵称" min-width="80" />
      <el-table-column prop="dept" label="部门" min-width="80" />
      <el-table-column prop="ip" label="登录IP" min-width="120" />
      <el-table-column prop="location" label="登录地点" min-width="120" />
      <el-table-column prop="browser" label="浏览器" min-width="100" />
      <el-table-column prop="time" label="登录时间" min-width="140" />
      <el-table-column label="操作" width="80">
        <template #default="scope">
          <el-link type="danger" @click="disconnectClient(scope.row)">
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
        当前页：第 {{ currentPage }} 页，每页显示：{{ pageSize }} 条
      </span>
    </div>
  </el-card>
</template>
