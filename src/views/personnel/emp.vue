<template>
  <!-- 表单 -->
  <div style="margin-top: 10px">
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
      <el-table-column fixed prop="name" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="120">
      </el-table-column>
      <el-table-column prop="birthday" label="生日" width="120">
      </el-table-column>
      <el-table-column prop="idcard" label="身份证号码" width="120">
      </el-table-column>
      <el-table-column prop="wedlock" label="婚姻状况" width="300">
      </el-table-column>
      <el-table-column prop="nation.name" label="民族" width="120">
          
      </el-table-column>
      <el-table-column width="100" align="left" label="合同期限">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.contractterm }}</el-tag>
          年
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="display: flex; justify-content: flex-end">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParams.pageNum"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageParams.pageSize"
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
        pageNum: 1,
        pageSize: 10,
        keyword: "",
      },
      list: null,
      total: 0,
      totalPage: 0
    };
  },
  //   created() {
  //      this.initData()
  //   },
  mounted() {
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
          this.totalPage = res.data.totalPage;
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
  },
};
</script>