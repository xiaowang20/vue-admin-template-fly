<template>
<div  class="app-container">
<!-- 表格 -->
<div class="table-container">
      <el-table ref="ecTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="员工id" width="100" align="center" :formatter="formatter">
          <!-- <template slot-scope="scope">{{scope.row.eid}}</template> -->
        </el-table-column>
             <el-table-column label="奖罚日期" width="100" align="center">
          <template slot-scope="scope">{{scope.row.ecdate}}</template>
        </el-table-column>
        <el-table-column label="奖罚原因" width="100" align="center">
          <template slot-scope="scope">{{scope.row.ecreason}}</template>
        </el-table-column>
        <el-table-column label="奖罚分数" width="100" align="center">
          <template slot-scope="scope">{{scope.row.ecpoint}}</template>
        </el-table-column>
        <el-table-column label="奖罚描述" width="100" align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="奖惩类型" width="140" align="center">
            <template slot-scope="scope">
                <label v-if="scope.row.ectype==='0'">奖励</label>
                <label v-else="scope.row.ectype==='1'">惩罚</label>
                </template>
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
</div>
</template>
<script>

import {getList} from '@/api/ec'
import {getAllById} from '@/api/employee'
export default{
    name:'EcList',
    data(){
        return({
            listLoading:false,
            list:null,
            total:0,
            pageParams:{
                pageNum:1,
                pageSize:5,
                eId:'',
            },
            empName:''
        })
    },
    created(){
        this.initData();
        this.getEmpName();
    },
    methods:{
        /**
         * 根据员工id获取员工名字
         */
    formatter(row,column){
        getAllById(row.eid).then(res=>{
           this.empName = res.data.name;
            return this.empName;
        })
       
        }
,
   /**
     * 初始化数据
     */
    initData() {
      this.loading = true;
        getList(this.pageParams)
        .then((res) => {
          this.loading = false;
          this.list = res.data.list;
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