<template>
<div  class="app-container">
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
        <el-form :inline="true" :model="pageParams" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="pageParams.keyword" class="input-width" placeholder="姓名" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
<!-- 表格 -->
<div class="table-container">
      <el-table ref="ecTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="员工" width="100" align="center">
          <template slot-scope="scope">{{scope.row.employee.name}}</template>
        </el-table-column>
        <el-table-column label="部门" width="100" align="center">
          <template slot-scope="scope">{{scope.row.department.name}}</template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="职位" width="100" align="center">
          <template slot-scope="scope">{{scope.row.joblevel.name}}</template>
        </el-table-column>
             <el-table-column label="调动日期" width="100" align="center">
          <template slot-scope="scope">{{scope.row.removedate}}</template>
        </el-table-column>
        <el-table-column label="调动原因" width="100" align="center">
          <template slot-scope="scope">{{scope.row.reason}}</template>
        </el-table-column>
        <el-table-column label="调动描述" width="100" align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
                <!-- 操作 -->
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
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
        :current-page.sync="pageParams.pageNum"
        :page-size="pageParams.pageSize"
        :page-sizes="[1,5,10,15,20]"
        :total="total">
      </el-pagination>
    </div>
     <!-- 编辑 -->
     <el-dialog
      :title="'编辑用户'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="EmpRemove"
               ref="EmpRemoveForm"
               label-width="150px" size="small">
        <el-form-item label="所属部门:" prop="afterdepid">
          <el-popover
            placement="right"
            title="请选择部门"
            width="200"
            trigger="manual"
            v-model="popVisible"
          >
            <el-tree
              default-expand-all
              :data="allDeps"
              :props="defaultProps"
              :expand-on-click-node="false"
              @node-click="searvhViewHandleNodeClick"
            ></el-tree>
            <div
              slot="reference"
              style="
                width: 150px;
                display: inline-flex;
                font-size: 13px;
                border: 1px solid #dedede;
                height: 26px;
                border-radius: 5px;
                cursor: pointer;
                align-items: center;
                padding-left: 8px;
                box-sizing: border-box;
              "
              @click="showDepView"
            >
              {{ inputDepName }}
            </div>
          </el-popover>
        </el-form-item>
        <el-form-item label="职称:" prop="afterjobid">
          <el-select
            v-model="EmpRemove.afterjobid"
            placeholder="职称"
            size="mini"
            style="width: 150px"
          >
            <el-option
              v-for="item in jobLevels"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调动日期:">
          <el-input v-model="EmpRemove.removedate" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="调动原因">
          <el-input v-model="EmpRemove.reason" type="textarea" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="调动描述:">
          <el-input v-model="EmpRemove.remark" type="textarea" style="width: 250px"></el-input>
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

import {getList,updateEmpRemove} from '@/api/EmpRemove'
import {
  getAllJobLevels,
  getAllDepartments,
} from "@/api/data";
const defaultListQuery ={
pageNum:1,
  pageSize:5,
  keyword:'',
}
const defaultEmpRemove={
id:'',
eid:'',
afterdepid:'',
afterjobid:'',
removedate:'',
reason:'',
remark:''
}
export default{
    name:'EmpRemoveList',
    data(){
        return({
            listLoading:false,
            list:null,
            total:0,
            pageParams: Object.assign({}, defaultListQuery),
            EmpRemove:Object.assign({}, defaultEmpRemove),
            jobLevels: [],
            allDeps: [],
            popVisible: false,
      inputDepName: "所属部门",
      defaultProps: {
        children: "children",
        label: "name",
      },
      dialogVisible:false
        })
    },
    created(){
        this.initData();
        this.initQueryData();
    },
    methods:{
         /**
       * 编辑
       */
       handleDialogConfirm(){
    this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            updateEmpRemove(this.EmpRemove.id,this.EmpRemove).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.initData();
            })
        
        })
      },
            /**
     * 高级搜索-展开
     */
    showDepView() {
      this.popVisible = !this.popVisible;
    },
            /**
     * 高级搜索-部门节点
     */
    searvhViewHandleNodeClick(data) {
      this.inputDepName = data.name;
      this.EmpRemove.afterdepid = data.id;
      this.popVisible = !this.popVisible;
    },
         /**
     * 初始化数据
     */
    initQueryData() {
      this.loading = true;
      //部门
      getAllDepartments().then((res) => {
        if (res.data) {
          this.allDeps = res.data;
        }
      });
      //职称
      getAllJobLevels().then((res) => {
        if (res.data) {
          this.jobLevels = res.data;
        }
      });

    },
        /**
       * 打开编辑表单
       */
      handleUpdate(index,row){
        this.dialogVisible=true;
        this.EmpRemove= Object.assign({}, row);
      },
    /**
       * 搜索
       */
      handleSearchList(){
          this.pageParams.pageNum=1;
          this.initData();
      },
        /**
         * 重置
         */
    handleResetSearch() {
        this.pageParams = Object.assign({}, defaultListQuery);
      },
   /**
     * 初始化数据
     */
    initData() {
      this.loading = true;
        getList(this.pageParams)
        .then((res) => {
          this.loading = false;
          this.list = res.data.list;
          console.log(this.list)
          this.total = res.data.total;
        });
    },

    handleSizeChange(val) {
      this.pageParams.pageNum = 1;
      this.pageParams.pageSize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.pageParams.pageNum = val;
      this.initData();
    },
    }
}

</script>