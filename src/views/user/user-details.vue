<template>
  <div class="m-activity_details">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px">
      <el-form-item label="姓名:" class="el_form">
        <div>张三</div>
      </el-form-item>
      <el-form-item label="工号:" class="el_form">
        <div>1726449738</div>
      </el-form-item>
      <el-form-item label="手机号:" class="el_form">
        <div>15988222200</div>
      </el-form-item>
      <el-form-item label="部门:" class="el_form">
        <div>事业发展科</div>
      </el-form-item>
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
