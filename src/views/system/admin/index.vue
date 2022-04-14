<template>

      <div class="app-container">
        <!-- 搜索框 -->
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
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="帐号/姓名" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 添加表单 -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <!-- 表格 -->
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="帐号" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="固定电话" width="160" align="center">
          <template slot-scope="scope">{{scope.row.telephone}}</template>
        </el-table-column>
        <el-table-column label="住址" width="160" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="头像" width="160" align="center">
          <template slot-scope="scope">{{scope.row.userface}}</template>
        </el-table-column>
    <el-table-column label="评论" width="160" align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value='true'
              :inactive-value='false'
              v-model="scope.row.enabled">
            </el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleSelectRole(scope.$index, scope.row)">分配角色
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
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
        :page-sizes="[1,5,10,15,20]"
        :total="total">
      </el-pagination>
    </div>
    <!-- 编辑用户 -->
     <el-dialog
      :title="isEdit?'编辑用户':'添加用户'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="admin"
               ref="adminForm"
               label-width="150px" size="small">
        <el-form-item label="帐号：">
          <el-input v-model="admin.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="admin.password"  type="password" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="admin.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="admin.phone" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="座机号:">
          <el-input v-model="admin.telephone" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="住址：">
          <el-input v-model="admin.address"  style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="头像：">
          <el-input v-model="admin.userface" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="admin.remark"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="admin.enabled">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色列表 -->
    <el-dialog
      title="分配角色"
      :visible.sync="allocDialogVisible"
      width="30%">
      <el-select v-model="allocRoleIds" multiple placeholder="请选择" size="small" style="width: 80%">
        <el-option
          v-for="item in allRoleList"
          :key="item.id"
          :label="item.namezh"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
      </div>
</template>
<script>
import {getList,updateStatus,updateAdmin,deleteAdmin,getRoleListByAdminId,allocRole} from '@/api/admin'
import {createAdmin} from '@/api/login'
import {getAllRoleList} from '@/api/role'
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    keyword: ''
  };
    const defaultAdmin = {
    id: '',
    username: '',
    password: '',
    name: '',
    phone:'',
    telephone:'',
    address:'',
    enabled:true,
    userface:'',
    remark:''
  };
export default {
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            admin: Object.assign({}, defaultAdmin),
            listLoading:false,
            list:[],
            total:0,
            dialogVisible:false,
            isEdit:false,
            allocDialogVisible:false,
            allocRoleIds:[],
            allocAdminId:'',
            allRoleList:[]
        }
    },

    created(){
        this.initData();
        this.getRoleList();
    },
    methods:{
      /**
       * 分配角色确定按钮
       */
      handleAllocDialogConfirm(){
          this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("adminId", this.allocAdminId);
          params.append("roleIds", this.allocRoleIds);
          allocRole(params).then(response => {
            this.$message({
              message: '分配成功！',
              type: 'success'
            });
            this.allocDialogVisible = false;
          })
        })
      },
      /**
       * 获取所有角色list
       */
      getRoleList(){
          getAllRoleList().then(res=>{
           this.allRoleList = res.data;
          })
      },
      /**
       * 根据AdminId分配查询
       */
      handleSelectRole(index,row){
        this.allocAdminId = row.id;
        this.allocDialogVisible = true;
        this.getRoleListByAdmin(row.id);
      },
      getRoleListByAdmin(adminId){
          getRoleListByAdminId(adminId).then(response=>{
             let allocRoleList = response.data;
          this.allocRoleIds=[];
          if(allocRoleList!=null&&allocRoleList.length>0){
            for(let i=0;i<allocRoleList.length;i++){
              this.allocRoleIds.push(allocRoleList[i].id);
            }
          }
          })
      },
      /**
       * 删除用户
       */
      handleDelete(index,row){
           this.$confirm('是否要删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAdmin(row.id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.initData();
          });
        });
      },
      /**
       * 添加、编辑表单
       */
      handleDialogConfirm(){
    this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            updateAdmin(this.admin.id,this.admin).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.initData();
            })
          } else {
            createAdmin(this.admin).then(response => {
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
       * 打开添加表单
       */
        handleAdd(){
        this.dialogVisible = true;
        this.isEdit = false;
        this.admin = Object.assign({},defaultAdmin);
},
      /**
       * 打开编辑表单
       */
      handleUpdate(index,row){
        this.dialogVisible=true;
        this.isEdit=true;
        this.admin= Object.assign({}, row);
      },
      /**
       * 搜索
       */
      handleSearchList(){
        debugger
          this.listQuery.pageNum=1;
          this.initData();
      },
        /**
         * 修改用户状态（是否启用）
         */
    handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        
          updateStatus(row.id,{status:row.enabled}).then(response => {
         
            this.$message({
              type: 'success',  
              message: '修改成功!'
            });
          });
        }).catch(() => {
      
          this.$message({
            type: 'info',
            message: '取消修改'
          });
          this.initData();
        });
      },
        /**
         * 分页-size
         */
    handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.initData();
      },
      /**
       * 分页-page
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
            getList(this.listQuery).then(res=>{
                this.listLoading=false;
                 this.total = res.data.total;
                 this.list = res.data.list;
            })
        },
        /**
         * 重置
         */
    handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
    }
}
</script>