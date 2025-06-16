<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

// @ts-expect-error
import { ElMessage, ElMessageBox } from 'element-plus'

// mock 服务数据
const allServices = ref([
  { id: 1, name: '推流服务A', port: '8000', streamCount: '2', status: '运行中' },
  { id: 2, name: '推流服务B', port: '8001', streamCount: '4', status: '已停止' },
  { id: 3, name: '推流服务C', port: '8002', streamCount: '1', status: '运行中' },
])
const searchName = ref('')
const dialogVisible = ref(false)
const newService = ref({ name: '', port: '', streamCount: '' })
const configDialogVisible = ref(false)
const configService = ref<any>(null)
const configStreamCount = ref('')
const router = useRouter()

// 搜索过滤
const filteredServices = computed(() => {
  if (!searchName.value)
    return allServices.value

  return allServices.value.filter(s => s.name.includes(searchName.value))
})

// 操作
function handleStart(service: any) {
  service.status = '运行中'
  ElMessage.success('服务已启动')
}
function handleStop(service: any) {
  service.status = '已停止'
  ElMessage.success('服务已停止')
}
function handleDelete(service: any) {
  ElMessageBox.confirm(`确认要删除服务【${service.name}】吗？`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    allServices.value = allServices.value.filter(s => s.id !== service.id)
    ElMessage.success('已删除')
  })
}
function handleCreate() {
  if (!newService.value.name || !newService.value.port || !newService.value.streamCount) {
    ElMessage.warning('请填写完整信息')
    return
  }
  allServices.value.push({
    id: Date.now(),
    name: newService.value.name,
    port: newService.value.port,
    streamCount: newService.value.streamCount,
    status: '已停止',
  })
  dialogVisible.value = false
  newService.value = { name: '', port: '', streamCount: '' }
  ElMessage.success('服务已创建')
}
function handleDebug(service: any) {
  // 跳转到调试页面，可以根据需要传递参数
  router.push({ path: '/debug' })
}
function handleConfig(service: any) {
  configService.value = service
  configStreamCount.value = service.streamCount
  configDialogVisible.value = true
}
function handleConfigSave() {
  if (!configStreamCount.value) {
    ElMessage.warning('请输入推流路数')
    return
  }
  configService.value.streamCount = configStreamCount.value
  configDialogVisible.value = false
  ElMessage.success('推流路数已更新')
}
</script>

<template>
  <el-card>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <div>
        <el-input v-model="searchName" placeholder="搜索服务名称" clearable style="width: 220px;" />
      </div>
      <el-button type="primary" @click="dialogVisible = true">
        创建信令服务
      </el-button>
    </div>
    <el-table :data="filteredServices" style="width: 100%; margin-top: 24px;">
      <el-table-column prop="name" label="服务名称" min-width="120">
        <template #default="scope">
          <el-link type="primary" :underline="false" @click="() => $router.push({ path: '/stream-tasks', query: { name: scope.row.name } })">
            {{ scope.row.name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="port" label="服务端口" min-width="120" />
      <el-table-column prop="streamCount" label="推流路数" min-width="100" />
      <el-table-column prop="status" label="运行状态" min-width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === '运行中' ? 'success' : 'info'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template #default="scope">
          <el-button v-if="scope.row.status === '已停止'" size="small" type="success" @click="handleStart(scope.row)">
            启动
          </el-button>
          <el-button v-else size="small" type="warning" @click="handleStop(scope.row)">
            停止
          </el-button>
          <el-button size="small" type="primary" @click="handleDebug(scope.row)">
            调试
          </el-button>
          <el-button size="small" type="info" @click="handleConfig(scope.row)">
            设置
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 创建服务弹窗 -->
    <el-dialog v-model="dialogVisible" title="创建服务" width="400px">
      <el-form label-width="80px">
        <el-form-item label="服务名称">
          <el-input v-model="newService.name" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="端口号">
          <el-input v-model="newService.port" placeholder="请输入端口号" />
        </el-form-item>
        <el-form-item label="推流路数">
          <el-input v-model="newService.streamCount" placeholder="请输入推流路数" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleCreate">
          创建
        </el-button>
      </template>
    </el-dialog>
    <!-- 设置推流路数弹窗 -->
    <el-dialog v-model="configDialogVisible" title="设置推流路数" width="400px">
      <el-form label-width="100px">
        <el-form-item label="推流路数">
          <el-input v-model="configStreamCount" placeholder="请输入推流路数" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="configDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleConfigSave">
          保存
        </el-button>
      </template>
    </el-dialog>
  </el-card>
</template>
