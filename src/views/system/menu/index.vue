<template>
  <div class="app-container">
      <!-- 添加 -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddMenu()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <!-- 表格 -->
    <div class="table-container">
      <el-table ref="menuTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="菜单名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
         <el-table-column label="资源路径" align="center">
          <template slot-scope="scope">{{scope.row.url}}</template>
        </el-table-column>
                <el-table-column label="前端path" align="center">
          <template slot-scope="scope">{{scope.row.path}}</template>
        </el-table-column>
                <el-table-column label="前端component" align="center">
          <template slot-scope="scope">{{scope.row.component}}</template>
        </el-table-column>
        <el-table-column label="前端图标" width="100" align="center">
          <template slot-scope="scope"><svg-icon :icon-class="scope.row.iconCls"></svg-icon></template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleEnableChange(scope.$index, scope.row)"
              :active-value="true"
              :inactive-value="false"
              v-model="scope.row.enabled">
            </el-switch>
          </template>
        </el-table-column>
                <el-table-column label="是否开启KeepAlive模式" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleKeepAliveChange(scope.$index, scope.row)"
              :active-value="true"
              :inactive-value="false"
              v-model="scope.row.keepalive">
            </el-switch>
          </template>
        </el-table-column>
    <el-table-column label="是否需要授权" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleRequireAuthChange(scope.$index, scope.row)"
              :active-value="true"
              :inactive-value="false"
              v-model="scope.row.requireAuth">
            </el-switch>
          </template>
        </el-table-column>
        <!-- 设置 -->
        <el-table-column label="设置" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :disabled="false"
              @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
            </el-button>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[1,5,10,15,20]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getMenuList,updateEnable,updateKeepAlive,updateRequireAuth,deleteById} from '@/api/menu'
export default {
data(){
    return{
        list:[],
        total:0,
        listLoading:false,
        listQuery: {
          pageNum: 1,
          pageSize: 5
        },
        parentId: 1
    }
},
created(){
    this.initData();
},
watch:{
    $route(route) {
        this.resetParentId();
        this.initData();
      }
},
methods:{
  /**
   * 删除菜单
   */
  handleDelete(index,row){
        this.$confirm('是否要删除该菜单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteById(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.initData();
          });
        });
  },
    /**
     * 根据id修改菜单
     */
    handleUpdate(index, row) {
        this.$router.push({path:'/system/updateMenu',query:{id:row.id}});
      },
    /**
     * 添加菜单
     */
    handleAddMenu() {
        this.$router.push('/system/addMenu');
      },
    /**
     * 重新赋值给parentId
     */
      resetParentId(){
        this.listQuery.pageNum = 1;
        if (this.$route.query.parentId != null) {
          this.parentId = this.$route.query.parentId;
        } else {
          this.parentId = 1;
        }
      },
    /**
     * 查看下一级
     */
      handleShowNextLevel(index, row) {
        this.$router.push({path: '/system/menuManage', query: {parentId: row.id}})
      },
    /**
     * 是否需要授权
     */
     handleRequireAuthChange(index, row) {
        updateRequireAuth(row.id,{requireAuth:row.requireAuth}).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
    /**
     * 是否开启KeepAlive模式
     */
     handleKeepAliveChange(index, row) {
        updateKeepAlive(row.id,{keepalive:row.keepalive}).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
    /**
     * 是否显示
     */
     handleHiddenChange(index, row) {
        updateEnable(row.id,{enabled:row.enabled}).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },

/**
 * 分页
 */
     handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.initData();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.initData();
      },
    /**
     * 初始化数据
     */
    initData(){
          this.listLoading = true;
        getMenuList(this.parentId,this.listQuery).then(response=>{
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        })
    }
}
}
</script>