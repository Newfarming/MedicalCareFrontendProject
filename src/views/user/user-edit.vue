<template>
  <div class="m-activity_details">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
      <el-form-item label="姓名:" class="el_form">
        <el-input v-model="temp.name" />
      </el-form-item>
      <el-form-item label="账号:" class="el_form">
        <el-input v-model="temp.username" />
      </el-form-item>
      <el-form-item label="手机号:" class="el_form">
        <el-input v-model="temp.phone" />
      </el-form-item>
      <el-form-item label="工号:" class="el_form">
        <el-input v-model="temp.workNo" />
      </el-form-item>
      <el-form-item label="身份证:" class="el_form">
        <el-input v-model="temp.identityCard" />
      </el-form-item>
      <el-form-item label="部门:" class="el_form">
        <el-select v-model="temp.depart_id" placeholder="部门" clearable class="filter-item" style="width: 120px;margin-right: 10px;">
          <el-option v-for="item in depart" :key="item.pk" :label="item.fields.title" :value="item.pk" />
        </el-select>
      </el-form-item>
      <el-form-item label="权限:" class="el_form">
        <el-select v-model="temp.permission_id" placeholder="权限" clearable class="filter-item" style="width: 120px;margin-right: 10px;">
          <el-option v-for="item in permissionList" :key="item.pk" :label="item.fields.name" :value="item.pk" />
        </el-select>
      </el-form-item>
      <el-form-item label="密码:" class="el_form">
        <el-input v-model="temp.password" />
      </el-form-item>
      <!--      <el-form-item label="确认密码:" class="el_form">-->
      <!--        <el-input  />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="权限:" class="el_form">-->
      <!--        <el-select  placeholder="权限类型" clearable class="filter-item" style="width: 120px;margin-right: 10px;">-->
      <!--          <el-option v-for="item in TypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <div style="text-align: center;">
        <el-button type="primary" style="margin-right: 40px;min-width: 120px;" @click="handleEditUser">确定</el-button>
        <el-button type="info" style="min-width: 120px;" @click="handleJumpLists">取消</el-button>
      </div>
    </el-form>

  </div>
</template>
<script>
import { getDepartList } from '@/api/table'
import {userEdit, getUserDetails, getPermissionList} from '@/api/user'

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
      temp: {
        id: '',
        username: '',
        name: '',
        password: '',
        depart_id: '',
        phone: '',
        workNo: '',
        identityCard: '',
        permission_id: ''
      },
      total: 0,
      tableKey: 0,
      list: null,
      depart: null,
      permissionList:null,
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
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log('this.$route.params', this.$route.params)
      this.listLoading = true
      getPermissionList({ search: '',
        // search_type: 'title',
        pageStart: 0,
        pagesize: 100
      }).then(response => {
        this.permissionList = response.data
        this.listLoading = false
      })
      getDepartList({
        search: '',
        search_type: 'title',
        pageStart: 0,
        pagesize: 100
      }).then(response => {
        this.depart = response.data
        console.log('getDepartList response', response)
        this.listLoading = false
      })
      getUserDetails({
        id: this.$route.params.id
      }).then(response => {
        console.log('user details info response', response)
        this.temp.identityCard = response.data.identityCard
        this.temp.username = response.data.username
        this.temp.name = response.data.name
        this.temp.workNo = response.data.workNo
        this.temp.phone = response.data.phone
        this.temp.depart_id = response.data.depart_id
        this.temp.permission_id = response.data.permission_id
        // this.temp.password = response.data.password
        this.temp.id = response.data.id
      })
    },
    userEdit() {
      userEdit(this.temp).then(response => {
        if (response.data === 'success') {
          this.$router.push('/user/user-list/')
        }
      })
    },
    handleJumpLists() {
      this.$router.push('/user/user-list/')
    },
    handleEditUser() {
      this.userEdit()
    }
  }
}
</script>
