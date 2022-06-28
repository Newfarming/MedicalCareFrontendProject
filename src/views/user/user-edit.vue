<template>
  <div class="m-activity_details">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
      <el-form-item label="活动名称:" class="el_form">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item label="日期:" class="el_form">
        <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
      </el-form-item>
      <el-form-item label="地点:" class="el_form">
        <el-input v-model="temp.place" />
      </el-form-item>
      <el-form-item label="部门:" class="el_form">
        <el-select v-model="temp.depart" placeholder="部门" clearable class="filter-item" style="width: 120px;margin-right: 10px;">
          <el-option v-for="item in departmentOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="密码:" class="el_form">
        <el-button type="primary">重制密码</el-button>
      </el-form-item>
      <el-form-item label="权限:" class="el_form">
        <el-select v-model="temp.type" placeholder="权限类型" clearable class="filter-item" style="width: 120px;margin-right: 10px;">
          <el-option v-for="item in TypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
      </el-form-item>
      <div style="text-align: center;">
        <el-button type="primary" style="margin-right: 40px;min-width: 120px;" @click="handleJumpLists">确定</el-button>
        <el-button type="info" style="min-width: 120px;" @click="handleJumpLists">取消</el-button>
      </div>
    </el-form>

  </div>
</template>
<script>
const activityStatusOptions = [
  { key: 'processing', display_name: '进行中' },
  { key: 'nostart', display_name: '未开始' },
  { key: 'ended', display_name: '已结束' }
]
const TypeOptions = [
  { key: '1', display_name: '普通权限' },
  { key: '2', display_name: '高级权限' },
  { key: '3', display_name: '最高权限' }
]
const departmentOptions = [
  { key: '1', display_name: '事业发展科' },
  { key: '2', display_name: '小区1' },
  { key: '3', display_name: '小区2' },
  { key: '4', display_name: '小区3' }
]
export default {
  name: 'UserList',
  components: { },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      departmentOptions,
      TypeOptions,
      activityStatusOptions,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      tableKey: 0,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    handleJumpLists() {
      this.$router.push('/user/user-list/')
    }
  }
}
</script>
