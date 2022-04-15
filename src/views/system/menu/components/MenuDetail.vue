<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="menu"
             :rules="rules"
             ref="menuFrom"
             label-width="150px">
      <el-form-item label="菜单名称：" prop="name">
        <el-input v-model="menu.name"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单：">
        <el-select v-model="menu.parentid"
                   placeholder="请选择菜单">
          <el-option
            v-for="item in selectMenuList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="前端path:" prop="path">
        <el-input v-model="menu.path"></el-input>
      </el-form-item>
      <el-form-item label="前端图标：" prop="iconCls">
        <el-input v-model="menu.iconcls" style="width: 80%"></el-input>
        <svg-icon style="margin-left: 8px" :icon-class="menu.iconcls"></svg-icon>
      </el-form-item>
      <el-form-item label="url">
        <el-input v-model="menu.url"></el-input>
      </el-form-item>
            <el-form-item label="component">
        <el-input v-model="menu.component"></el-input>
      </el-form-item>
            <el-form-item label="是否显示：">
        <el-radio-group v-model="menu.enabled">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
            <el-form-item label="是否开启KeepAlive模式">
        <el-radio-group v-model="menu.keepalive">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
            <el-form-item label="是否需要授权">
        <el-radio-group v-model="menu.requireauth">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('menuFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('menuFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getMenuList, createMenu, updateMenu, getMenuById} from '@/api/menu';
    const defaultMenu = {
    parentid: 1,
    name: '',
    iconcls: '',
    enabled: true,
    url:'',
    path:'',
    component:'',
    requireauth:true,
    keepalive:true

  };
export default{
       name: "MenuDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
        data() {
      return {
        menu: Object.assign({}, defaultMenu),
        selectMenuList: [],
        rules: {
          name: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          iconcls: [
            {required: true, message: '请输入前端图标', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        }
      }
    },
   created() {
      if (this.isEdit) {
        getMenuById(this.$route.query.id).then(response => {
          this.menu = response.data;
        });
      } else {
        this.menu = Object.assign({}, defaultMenu);
      }
      this.getSelectMenuList();
    },
    methods:{
        /**
         * 操作成败
         */
    onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                  debugger
                  console.log(this.menu)
                  console.log(this.$route.query.id)
                updateMenu(this.$route.query.id, this.menu).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createMenu(this.menu).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
        /**
         * 重置表单
         */
    resetForm(formName) {
        this.$refs[formName].resetFields();
        this.menu = Object.assign({}, defaultMenu);
        this.getSelectMenuList();
      },
        /**
         * 判断有无上级菜单
         */
         getSelectMenuList() {
        getMenuList(1, {pageSize: 10, pageNum: 1}).then(response => {
          this.selectMenuList = response.data.list;
          this.selectMenuList.unshift({id: 1, name: '无上级菜单'});
        });
      }

    }

}
</script>

<style scoped>

</style>