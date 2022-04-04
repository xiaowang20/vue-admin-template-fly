<template>
  <div class="block">
    <el-pagination
      @size-change="(val) => handleSizeChange(param1, val)"
      @current-change="(val) => handleCurrentChange(param2, val)"
      :current-page="currentPage1"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    methods: {
      handleSizeChange(myParam, val) {
        console.log('自定义参数1', myParam);
      },
      handleCurrentChange(myParam, val) {
        console.log('自定义参数2', myParam);
      }
    },
    data() {
      return {
        currentPage1: 4
      };
    }
  }
</script>