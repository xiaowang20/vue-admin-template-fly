<template>
      <div class="app-container">
    <!-- 搜索表单 -->
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="角色名称" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 添加角色 -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <!-- 表格 -->
    <!-- <div class="operate-container">
        <el-button type="danger" @click="handleDeleteBatch()" plain>批量删除</el-button>
    </div> -->
    <div class="table-container">
      <el-table ref="roleTable"
                @selection-change="handleSelectionChange"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">{{scope.row.namezh}}</template>
        </el-table-column>
         <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button size="mini"
                         type="text"
                         @click="handleSelectMenu(scope.$index, scope.row)">分配菜单
              </el-button>
            </el-row>
            <el-row>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            </el-row>
          </template>
         </el-table-column>
      </el-table>

    </div>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[1,5,10,15]"
        :total="total">
      </el-pagination>
    </div>
    <!-- 添加、编辑角色表单 -->
    <el-dialog
      :title="isEdit?'编辑角色':'添加角色'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="role"
               ref="roleForm"
               label-width="150px" size="small">
        <el-form-item label="角色名称：">
          <el-input v-model="role.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="role.namezh"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getRoleList,updateRole,createRole,deleteRole} from '@/api/role'
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    keyword: ''
  };
    const defaultRole = {
    id: null,
    name: null,
    namezh: null,
  };
export default {
    name: 'roleList',
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            role: Object.assign({}, defaultRole),
            list:[],
            total:0,
            listLoading:false,
            dialogVisible:false,
            isEdit:false,
            ids:[],
        }
    },
    created(){
        this.initData();
    },
    methods:{
        /**
         * 批量删除
         */
        handleDelete(index,row){
        this.$confirm('是否要删除该角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          ids.push(row.id);
          let params=new URLSearchParams();
          params.append("roleIds",ids);
          deleteRole(params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.initData();
          });
        });
        },
        /**
         * 添加角色信息
         */
    handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.role = Object.assign({},defaultRole);
      },
        /**
         * 编辑角色信息
         */
        handleUpdate(index,row){
        this.dialogVisible = true;
        this.isEdit = true;
        this.role = Object.assign({},row);
        },
        /**
         * 添加、编辑表单
         */
        handleDialogConfirm(index,row){
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            updateRole(this.role.id,this.role).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.initData();
            })
          } else {
            createRole(this.role).then(response => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.initData();
            })
          }
        })
        },
        /**
         * 重置
         */
        handleResetSearch(){
            this.listQuery = Object.assign({}, defaultListQuery);
        },
        /**
         * 搜索
         */
        handleSearchList(){
            this.listQuery.pageNum=1;
            this.initData();
        },
        /**
         * 当前数量
         */
        handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.initData();
      },
      /**
       * 当前页面
       */
        handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.initData();
      },
        /**
         * 初始化数据
         */
        initData(){
            this.listLoading=true;
            getRoleList(this.listQuery).then(res=>{
            this.listLoading = false;
            this.list = res.data.list;
            this.total = res.data.total;
            })
        }
    }
}
</script>