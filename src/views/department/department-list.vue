<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="搜索内容" style="width: 150px;margin-right: 10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索部门
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleJumpAdd">
        添加部门
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="depart"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID"  align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.pk }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门名称" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleJumpDetails(row)">{{ row.fields.title }}</span>
          <!--          <el-tag>{{ row.type | typeFilter }}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleJumpEdit(row)">
            编辑
          </el-button>
          <el-button size="mini" type="success" @click="handleJumpDetails(row)">
            详情
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

<!--    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />-->
  </div>
</template>

<script>
import { getDepartList, departDelete } from '@/api/table'
// import { userDelete } from '@/api/user'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const TypeOptions = [
  { key: '1', display_name: '姓名' },
  { key: '2', display_name: '工号' },
  { key: '3', display_name: '手机号' },
  { key: '4', display_name: '部门' }
]
export default {
  name: 'DepartList',
  components: { Pagination },
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
      total: 0,
      tableKey: 0,
      // list: null,
      depart: null,
      listLoading: true,
      TypeOptions,
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
      this.listLoading = true
      getDepartList({
        search: '',
        search_type: 'title',
        pageStart: 0,
        pagesize: 100
      }).then(response => {
        this.depart = response.data
        this.listLoading = false
      })
    },
    handleJumpDetails(row) {
      // this.$router.push('/department/department-details/' + row.pk)
    },
    handleJumpEdit(row) {
      console.log('row:' + JSON.stringify(row))
      this.$router.push('/department/department-edit/' + row.pk)
    },
    handleJumpAdd() {
      this.$router.push('/department/department-add')
    },
    handleDelete(row) {
      departDelete({
        id: row.pk
      }).then(response => {
        this.fetchData()
        // this.listLoading = false
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    handleFilter() {
      // this.listQuery.page = 1
      // this.get()
    },
  }
}
</script>
