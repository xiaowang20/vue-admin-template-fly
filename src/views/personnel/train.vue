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
             <el-table-column label="培训日期" width="100" align="center">
          <template slot-scope="scope">{{scope.row.traindate}}</template>
        </el-table-column>
        <el-table-column label="培训内容" width="100" align="center">
          <template slot-scope="scope">{{scope.row.traincontent}}</template>
        </el-table-column>
        <el-table-column label="培训描述" width="100" align="center">
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
      <el-form :model="Ec"
               ref="EmpTrainForm"
               label-width="150px" size="small">
        <el-form-item label="培训日期:">
          <el-input v-model="EmpTrain.traindate" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="培训内容:">
          <el-input v-model="EmpTrain.traincontent"  type="textarea" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="培训描述:">
          <el-input v-model="EmpTrain.remark" type="textarea" style="width: 250px"></el-input>
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

import {getList,updateEmpTrain} from '@/api/EmpTrain'
const defaultListQuery ={
   pageNum:1,
  pageSize:5,
  keyword:'',
}
const defaultEmpTrain={
id:'',
eid:'',
traindate:'',
traincontent:'',
remark:''
}
export default{
    name:'EmpTrainList',
    data(){
        return({
            listLoading:false,
            list:null,
            total:0,
            pageParams: Object.assign({}, defaultListQuery),
            EmpTrain:Object.assign({}, defaultEmpTrain),
            dialogVisible:false
        })
    },
    created(){
        this.initData();
    },
    methods:{
           /**
       * 打开编辑表单
       */
      handleUpdate(index,row){
        this.dialogVisible=true;
        this.EmpTrain= Object.assign({}, row);
      },
      /**
       * 编辑
       */
       handleDialogConfirm(){
    this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            updateEmpTrain(this.EmpTrain.id,this.EmpTrain).then(response => {
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