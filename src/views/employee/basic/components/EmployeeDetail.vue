<template>
  <div :is-edit="isEdit" style="margin-top: 50px">
    <el-form
      :model="emp"
      :rules="rules"
      ref="EmplyeeDetailForm"
      style="width: 600px"
      size="small"
    >
      <el-form-item size="mini" style="width: 300px" label="姓名" prop="name">
        <el-input v-model="emp.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="gender">
        <el-radio-group v-model="emp.gender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期:" prop="birthday">
        <el-date-picker
          v-model="emp.birthday"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="出生日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="籍贯:" prop="nativeplace">
        <el-input
          size="mini"
          style="width: 120px"
          prefix-icon="el-icon-edit"
          v-model="emp.nativeplace"
          placeholder="请输入籍贯"
        ></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱:" prop="email">
        <el-input
          size="mini"
          style="width: 150px"
          prefix-icon="el-icon-message"
          v-model="emp.email"
          placeholder="请输入电子邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系地址:" prop="address">
        <el-input
          size="mini"
          style="width: 200px"
          prefix-icon="el-icon-edit"
          v-model="emp.address"
          placeholder="请输入联系地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话号码:" prop="phone">
        <el-input
          size="mini"
          style="width: 200px"
          prefix-icon="el-icon-phone"
          v-model="emp.phone"
          placeholder="电话号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="工号:" prop="workid">
        <el-input
          size="mini"
          style="width: 150px"
          prefix-icon="el-icon-edit"
          v-model="emp.workid"
          placeholder="工号"
        ></el-input>
      </el-form-item>
      <el-form-item label="毕业院校:" prop="school">
        <el-input
          size="mini"
          style="width: 150px"
          prefix-icon="el-icon-edit"
          v-model="emp.school"
          placeholder="毕业院校名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="专业名称:" prop="specialty">
        <el-input
          size="mini"
          style="width: 200px"
          prefix-icon="el-icon-edit"
          v-model="emp.specialty"
          placeholder="请输入专业名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="入职日期:" prop="begindate">
        <el-date-picker
          v-model="emp.begindate"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 130px"
          placeholder="入职日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="转正日期:" prop="conversiontime">
        <el-date-picker
          v-model="emp.conversiontime"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 130px"
          placeholder="转正日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同起始日期:" prop="begincontract">
        <el-date-picker
          v-model="emp.begincontract"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 130px"
          placeholder="合同起始日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同终止日期:" prop="endcontract">
        <el-date-picker
          v-model="emp.endcontract"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          style="width: 150px"
          placeholder="合同终止日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="身份证号码:" prop="idcard">
        <el-input
          size="mini"
          style="width: 180px"
          prefix-icon="el-icon-edit"
          v-model="emp.idcard"
          placeholder="请输入身份证号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="聘用形式:" prop="engageform">
        <el-radio-group v-model="emp.engageform">
          <el-radio label="劳动合同">劳动合同</el-radio>
          <el-radio label="其他合同">其他合同</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="婚姻状况:" prop="wedlock">
        <el-radio-group v-model="emp.wedlock">
          <el-radio label="已婚">已婚</el-radio>
          <el-radio label="未婚">未婚</el-radio>
          <el-radio label="离异">离异</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-form-item
          style="text-align: left"
          label="政治面貌:"
          prop="politicid"
        >
          <el-select v-model="emp.politicid" placeholder="政治面貌" size="mini">
            <el-option
              v-for="item in politicsstatus"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族:" prop="nationid">
          <el-select
            v-model="emp.nationid"
            placeholder="民族"
            size="mini"
            style="width: 150px"
          >
            <el-option
              v-for="item in nations"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位:" prop="posid">
          <el-select
            v-model="emp.posid"
            placeholder="职位"
            size="mini"
            style="width: 150px"
          >
            <el-option
              v-for="item in positions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职称:" prop="joblevelid">
          <el-select
            v-model="emp.joblevelid"
            placeholder="职称"
            size="mini"
            style="width: 150px"
          >
            <el-option
              v-for="item in joblevels"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门:" prop="departmentid">
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
        <el-button
          type="primary"
          style="text-align: center"
          @click="onSubmit('EmplyeeDetailForm')"
          >立即创建</el-button
        >
        <el-button
          style="text-align: center"
          @click="resetForm('EmplyeeDetailForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addEmp, getAllById, updateEmp } from "@/api/employee";
import {
  getAllPoliticsStatus,
  getAllNations,
  getAllPositions,
  getAllJobLevels,
  getAllDepartments,
} from "@/api/data";
//默认Emp参数
const defaultEmp = {
    id:'',
  name: "",
  gender: "",
  birthday: "2000-03-17",
  idcard: "610122199001011256",
  wedlock: "已婚",
  nationid: 1,
  nativeplace: "陕西",
  politicid: "",
  email: "laowang@qq.com",
  phone: "18565558897",
  address: "岳阳市市云溪区",
  departmentid: null,
  jobLevelid: 9,
  posid: 29,
  engageform: "劳务合同",
  tiptopdegree: "本科",
  specialty: "信息管理与信息系统",
  school: "深圳大学",
  begindate: "2017-12-31",
  workstate: "在职",
  workid: "00000057",
  contractterm: 2,
  conversiontime: "2018-03-31",
  notworkdate: null,
  begincontract: "2017-12-31",
  endcontract: "2019-12-31",
  workage: null,
};
export default {
  name: "EmployeeDetail",

  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      emp: Object.assign({}, defaultEmp),

      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
        birthday: [
          { required: true, message: "请输入出生日期", trigger: "blur" },
        ],
        idcard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          {
            pattern:
              /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "身份证号码格式不正确",
            trigger: "blur",
          },
        ],
        wedlock: [
          { required: true, message: "请输入婚姻状况", trigger: "blur" },
        ],
        nationid: [{ required: true, message: "请输入您组", trigger: "blur" }],
        nativeplace: [
          { required: true, message: "请输入籍贯", trigger: "blur" },
        ],
        politicid: [
          { required: true, message: "请输入政治面貌", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        address: [
          { required: true, message: "请输入员工地址", trigger: "blur" },
        ],
        departmentid: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        joblevelid: [
          { required: true, message: "请输入职称", trigger: "blur" },
        ],
        posid: [{ required: true, message: "请输入职位", trigger: "blur" }],
        engageform: [
          { required: true, message: "请输入聘用形式", trigger: "blur" },
        ],
        tiptopdegree: [
          { required: true, message: "请输入学历", trigger: "blur" },
        ],
        specialty: [{ required: true, message: "请输入专业", trigger: "blur" }],
        school: [
          { required: true, message: "请输入毕业院校", trigger: "blur" },
        ],
        begindate: [
          { required: true, message: "请输入入职日期", trigger: "blur" },
        ],
        workstate: [
          { required: true, message: "请输入工作状态", trigger: "blur" },
        ],
        workid: [{ required: true, message: "请输入工号", trigger: "blur" }],
        contractterm: [
          { required: true, message: "请输入合同期限", trigger: "blur" },
        ],
        conversiontime: [
          { required: true, message: "请输入转正日期", trigger: "blur" },
        ],
        notworkdate: [
          { required: true, message: "请输入离职日期", trigger: "blur" },
        ],
        begincontract: [
          { required: true, message: "请输入合同起始日期", trigger: "blur" },
        ],
        endcontract: [
          { required: true, message: "请输入合同结束日期", trigger: "blur" },
        ],
        workage: [{ required: true, message: "请输入工龄", trigger: "blur" }],
      },
      politicsstatus: [],
      nations: [],
      positions: [],
      joblevels: [],
      allDeps: [],
      popVisible: false,
      inputDepName: "所属部门",
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  created() {
    if (this.isEdit) {
      getAllById(this.$route.query.id).then((response) => {
        this.emp = response.data;
      });
    } else {
      this.emp = Object.assign({}, defaultEmp);
    }
    this.initQueryData();
  },
  methods: {
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
      this.emp.departmentId = data.id;
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
      //职位
      getAllJobLevels().then((res) => {
        if (res.data) {
          this.joblevels = res.data;
        }
      });
      //职位
      getAllPositions().then((res) => {
        if (res.data) {
          this.positions = res.data;
        }
      });
      //民族
      getAllNations().then((res) => {
        if (res.data) {
          this.nations = res.data;
        }
      });
      //政治面貌
      getAllPoliticsStatus().then((res) => {
        if (res.data) {
          this.politicsstatus = res.data;
        }
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if (this.isEdit) {
              updateEmp(this.emp.id,this.emp).then((response) => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 1000,
                });
                this.$router.back();
              });
            } else {
              addEmp(this.emp).then((response) => {
                this.$refs[formName].resetFields();
                this.emp = Object.assign({}, defaultEmp);
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000,
                });
              });
            }
          });
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.emp = Object.assign({}, defaultEmp);
    },
  },
};
</script>