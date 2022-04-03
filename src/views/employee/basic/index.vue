<template>
<div>
  <!-- 表单 -->
  <div class="table-container">
    <el-table
      stripe
      :data="list"
      v-loading="loading"
      element-loading-text="正在加载..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%"
      height="250"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" fixed align="left" label="姓名" width="90">
      </el-table-column>
      <el-table-column prop="workid" label="工号" align="left" width="85">
      </el-table-column>
      <el-table-column prop="gender" label="性别" align="left" width="85">
      </el-table-column>
      <el-table-column prop="birthday" width="95" align="left" label="出生日期">
      </el-table-column>
      <el-table-column
        prop="idcard"
        width="165"
        align="left"
        label="身份证号码"
      >
      </el-table-column>
      <el-table-column prop="wedlock" width="70" label="婚姻状况">
      </el-table-column>
      <el-table-column prop="nation.name" width="50" label="民族">
      </el-table-column>
      <el-table-column prop="nativeplace" width="80" label="籍贯">
      </el-table-column>
      <el-table-column prop="politicsstatus.name" label="政治面貌">
      </el-table-column>
      <el-table-column prop="email" width="180" align="left" label="电子邮件">
      </el-table-column>
      <el-table-column prop="phone" width="120" align="left" label="电话号码">
      </el-table-column>
      <el-table-column prop="address" width="220" align="left" label="联系地址">
      </el-table-column>
      <el-table-column
        prop="department.name"
        width="100"
        align="left"
        label="所属部门"
      >
      </el-table-column>
      <el-table-column prop="position.name" width="100" label="职位">
      </el-table-column>
      <el-table-column prop="joblevel.name" width="100" label="职称">
      </el-table-column>
      <el-table-column
        prop="engageform"
        width="100"
        align="left"
        label="聘用形式"
      >
      </el-table-column>
      <el-table-column
        prop="tiptopDegree"
        width="80"
        align="left"
        label="最高学历"
      >
      </el-table-column>
      <el-table-column prop="specialty" width="150" align="left" label="专业">
      </el-table-column>
      <el-table-column prop="school" width="150" align="left" label="毕业院校">
      </el-table-column>
      <el-table-column
        prop="begindate"
        width="95"
        align="left"
        label="入职日期"
      >
      </el-table-column>
      <el-table-column
        prop="conversiontime"
        width="95"
        align="left"
        label="转正日期"
      >
      </el-table-column>
      <el-table-column
        prop="begincontract"
        width="95"
        align="left"
        label="合同起始日期"
      >
      </el-table-column>
      <el-table-column
        prop="endcontract"
        width="95"
        align="left"
        label="合同截止日期"
      >
      </el-table-column>
      <el-table-column width="100" align="left" label="合同期限">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.contractterm }}</el-tag>
          年
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
        :current-page.sync="pageParams.pageNum"
        :page-sizes="[5,10,15]"
        :page-size.sync="pageParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    </div>
</template>
<script>
import employee from "@/api/employee";
export default {
  name: "basicList",
  data() {
    return {
      loading: false,
      pageParams: {
        pageNum: 0,
        pageSize: 10,
        keyword: null
      },
      list: [],
      total: 0,
      totalPage: 0,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      this.loading = true;
      employee
        .getAllEmps(
          this.pageParams.pageNum,
          this.pageParams.pageSize,
          this.pageParams.keyword
        )
        .then((res) => {
          this.loading = false;
          this.list = res.data.list;
          this.total = res.data.total;
          this.pageNum = res.data.pageNum
          this.pageSize = res.data.pageSize
          this.totalPage = res.data.totalPage;
        });
    },

    handleSizeChange(val) {
      this.pageParams.pageSize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.pageParams.pageNum = val;
      this.initData();
    },
  },
};
</script>