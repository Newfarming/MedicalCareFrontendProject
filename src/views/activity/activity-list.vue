<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="搜索内容" style="width: 150px;margin-right: 10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type" placeholder="搜索类型" clearable class="filter-item" style="width: 120px;margin-right: 10px;">
        <el-option v-for="item in TypeOptions" :key="item.key" :label="item.display_name" :value="item.value" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-top:5px;" @click="fetchData">
        搜索活动
      </el-button>
      <el-button v-show="permission_type.indexOf('9')>=0" class="filter-item" style="margin-left: 10px; margin-top:5px;" type="primary" icon="el-icon-edit" @click="handleJumpAdd">
        添加活动
      </el-button>
      <!--      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">-->
      <!--        Export-->
      <!--      </el-button>-->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.pk }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动标题" min-width="150px" @click="handleJumpDetails(row)">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleJumpDetails(row)">{{ row.fields.name }}</span>
          <!--          <el-tag>{{ row.type | typeFilter }}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="150px" align="center" @click="handleJumpDetails(row)">
        <template slot-scope="{row}">
          <span>{{ row.fields.start_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动状态" class-name="status-col" width="100" @click="handleJumpDetails(row)">
        <template slot-scope="{row}">
          <el-tag :type="row.fields.activity_status | statusFilter">
            {{ row.fields.activity_status | statusNameFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-show="permission_type.indexOf('12')>=0" type="primary" size="mini" @click="handleJumpEdit(row)">
            编辑
          </el-button>
          <el-button size="mini" type="success" @click="handleJumpDetails(row)">
            详情
          </el-button>
          <el-button v-show="permission_type.indexOf('10')>=0" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>

<script>
import { getActivityList, activityDelete } from '@/api/table'
import Pagination from '@/components/Pagination'
import { getPermissionTypeCookie } from '@/utils/auth' // secondary package based on el-pagination

const TypeOptions = [
  { key: '1', display_name: '活动名', value: 'name' },
  { key: '2', display_name: '地点', value: 'place' },
  { key: '3', display_name: '积分', value: 'score' }
  // { key: '4', display_name: '开始时间', value: 'start_name' }
]
export default {
  name: 'UserList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'gray',
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    },
    statusNameFilter(status) {
      const statusNameMap = {
        0: '未开始',
        1: '进行中',
        2: '已结束'
      }
      return statusNameMap[status]
    }
  },
  data() {
    return {
      total: 0,
      tableKey: 0,
      list: null,
      depart: null,
      listLoading: true,
      TypeOptions,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: '',
        type: '',
        sort: '+id'
      },
      permission_type: getPermissionTypeCookie().split(',')
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getActivityList({
        search: this.listQuery.title || '',
        search_type: this.listQuery.type || '',
        pageStart: this.listQuery.page - 1 || 0,
        pagesize: this.listQuery.limit || 20
      }).then(response => {
        // console.log('getActivityList', getActivityList)
        this.list = response.data
        this.listLoading = false
        this.total = response.total
      })
    },
    handleJumpDetails(row) {
      this.$router.push('/activity/activity-details/' + row.pk)
    },
    handleJumpEdit(row) {
      this.$router.push('/activity/activity-edit/' + row.pk)
    },
    handleJumpAdd() {
      this.$router.push('/activity/activity-add')
    },
    handleDelete(row) {
      activityDelete({
        id: row.pk
      }).then(response => {
        this.fetchData()
        // this.listLoading = false
      })
    },
    handleSearch() {
      this.listLoading = true
      getActivityList({
        search: this.listQuery.title || '',
        search_type: this.listQuery.type || '',
        pageStart: 0,
        pagesize: 10
      }).then(response => {
        // console.log('getActivityList', getActivityList)
        this.list = response.data
        this.listLoading = false
        this.total = 100
      })
    },
    sortChange(data) {
      // const { prop, order } = data
      // if (prop === 'id') {
      //   this.sortByID(order)
      // }
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
