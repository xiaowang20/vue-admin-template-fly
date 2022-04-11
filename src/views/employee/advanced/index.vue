<template>
  <div>
    <div>
      <div style="display: flex; justify-content: space-between">
        <!-- 搜索框 -->
        <div>
          <el-input
            placeholder="请输入员工名进行搜索，可以直接回车搜索..."
            prefix-icon="el-icon-search"
            clearable
            style="width: 350px; margin-right: 10px"
            @keydown.enter.native="initData"
            v-model="pageParams.name"
          >
          </el-input>

          <el-button
            icon="el-icon-search"
            type="primary"
            @click="searchBrandList()"
          >
            搜索
          </el-button>

          <el-button
            type="primary"
            @click="showAdvanceSearchView = !showAdvanceSearchView"
          >
            <i
              :class="
                showAdvanceSearchView
                  ? 'fa fa-angle-double-up'
                  : 'fa fa-angle-double-down'
              "
              aria-hidden="true"
            >
            </i>
            高级搜索
          </el-button>
          <!-- 导入数据框 -->
        </div>

        <div>
          <!-- <el-upload
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-error="onError"
            :disabled="importDataDisabled"
            style="display: inline-flex; margin-right: 8px"
            action="GLOBAL_API+'/data/upload'"
          >
            <el-button
              :disabled="importDataDisabled"
              type="success"
              icon="el-icon-upload2"
            >
              {{ importDataBtnText }}
            </el-button>
          </el-upload> -->
          <el-button type="success" @click="downLoad" icon="el-icon-download">
            导出数据
          </el-button>
          <!-- <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">
            添加用户
          </el-button> -->
        </div>
      </div>
      <!-- 搜索表单 -->
      <transition name="slide-fade">
        <div
          v-show="showAdvanceSearchView"
          style="
            border: 1px solid #409eff;
            border-radius: 5px;
            box-sizing: border-box;
            padding: 5px;
            margin: 10px 0px;
          "
        >
        <!-- 第一行 -->
          <el-row>
            <el-col :span="5">
              <el-select
                v-model="pageParams.politicId"
                placeholder="政治面貌"
                size="mini"
                style="width: 130px"
              >
                <el-option
                  v-for="item in politicsstatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-select
                v-model="pageParams.nationId"
                placeholder="民族"
                size="mini"
                style="width: 130px"
              >
                <el-option
                  v-for="item in nations"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select> 
              </el-col>
            <el-col :span="5"><el-select
                v-model="pageParams.positionId"
                placeholder="职位"
                size="mini"
                style="width: 130px"
              >
                <el-option
                  v-for="item in positions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select> </el-col>
              <el-col :span="5">
                 <el-select
                v-model="pageParams.jobLevelId"
                placeholder="职称"
                size="mini"
                style="width: 130px"
              >
                <el-option
                  v-for="item in joblevels"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              </el-col>
              <el-col :span="5">
                 <el-radio-group v-model="pageParams.engageForm">
                <el-radio label="劳动合同">劳动合同</el-radio>
              </el-radio-group>
              </el-col>
          </el-row>
          <!-- 第二行 -->
          <el-row>
            <el-col :span="5">
              <el-popover
                placement="right"
                title="请选择部门"
                width="200"
                trigger="manual"
                v-model="popVisible2"
              >
                <el-tree
                  default-expand-all
                  :data="allDeps"
                  :props="defaultProps"
                  @node-click="searvhViewHandleNodeClick"
                ></el-tree>
                <div
                  slot="reference"
                  style="
                    width: 130px;
                    display: inline-flex;
                    font-size: 13px;
                    border: 1px solid #dedede;
                    height: 26px;
                    border-radius: 5px;
                    cursor: pointer;
                    align-items: center;
                    padding-left: 8px;
                    box-sizing: border-box;
                    margin-left: 3px;
                  "
                  @click="showDepView2"
                >
                  {{ inputDepName }}
                </div>
              </el-popover>
              </el-col>
            <el-col :span="5" :offset="4">
              <el-button size="mini">取消</el-button>
              <el-button
                size="mini"
                icon="el-icon-search"
                type="primary"
                @click="initData()"
                >搜索</el-button
              >
            </el-col>
          </el-row>
        </div>
      </transition>
    </div>
    <!-- 表格 -->
    <div style="margin-top: 10px">
      <el-table
        :data="list"
        stripe
        border
        v-loading="loading"
        element-loading-text="正在加载..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" fixed align="left" label="姓名" width="90">
        </el-table-column>
        <el-table-column prop="workid" label="工号" align="left" width="85">
        </el-table-column>
        <el-table-column prop="gender" label="性别" align="left" width="85">
        </el-table-column>
        <el-table-column
          prop="birthday"
          width="95"
          align="left"
          label="出生日期"
        >
        </el-table-column>
        <el-table-column
          prop="idcard"
          width="170"
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
        <el-table-column prop="phone" width="110" align="left" label="电话号码">
        </el-table-column>
        <el-table-column
          prop="address"
          width="220"
          align="left"
          label="联系地址"
        >
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
          prop="tiptopdegree"
          width="80"
          align="left"
          label="最高学历"
        >
        </el-table-column>
        <el-table-column prop="specialty" width="150" align="left" label="专业">
        </el-table-column>
        <el-table-column
          prop="school"
          width="150"
          align="left"
          label="毕业院校"
        >
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
        <!-- 操作 -->
        <el-table-column fixed="right" width="150" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="showEditEmpView(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteEmp(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end">
        <el-pagination
          :current-page.sync="pageParams.pageNum"
          :page-sizes="[1, 10, 20, 30, 50]"
          :page-size="pageParams.pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 添加表单 -->
  </div>
</template>
<script>
import { getAllEmpsByQuery } from "@/api/employee";
import {export2,getAllPoliticsStatus,getAllNations,getAllPositions,getAllJobLevels,getAllDepartments} from "@/api/data";
export default {
  name: "basicList",
  data() {
    return {
      paginationShow: true,
      loading: false,
      pageParams: {
        pageNum: 1,
        pageSize: 10,
        name: '',
        politicId: '',
        nationId: '',
        departmentId: '',
        jobLevelId: '',
        engageForm: '',
      },
      list: [],
      total: 0,
      totalPage: 0,
      importDataBtnText: "导入数据",
      importDataDisabled: false,
      GLOBAL_API: process.env.BASE_API,
      showAdvanceSearchView: false,
      politicsstatus:[],
      nations:[],
      positions:[],
      joblevels:[],
      allDeps:[],
      popVisible2:false,
      inputDepName: "所属部门",
      defaultProps: {
        children: "children",
        label: "name",
      },
      
    };
  },
  created() {
    this.initQueryData();
    this.initData();
  },
  methods: {
      /**
     * 导出
     */
    downLoad(){
		location.href = "http://localhost:8081/data/export2?pageNum="+this.pageParams.pageNum+"&pageSize="+this.pageParams.pageSize
		},
    /**
     * 初始化搜索数据
     */
    initQueryData(){
            this.loading = true;
      //部门
      getAllDepartments().then(res=>{
       if(res.data){ 
      this.allDeps = res.data
       }
      })
      //职位
      getAllJobLevels().then(res=>{
               if(res.data){ 
      this.joblevels = res.data
       }
       
      })
      //职位
      getAllPositions().then(res=>{
                  if(res.data){ 
      this.positions = res.data
       }
      })
      //民族
        getAllNations().then(res=>{
      if(res.data){
      this.nations = res.data;
      }
      })
     //政治面貌   
      getAllPoliticsStatus().then(res=>{
      if(res.data){
       this.politicsstatus = res.data
}})
    },
    /**
     * 高级搜索-展开
     */
    showDepView2() {
      this.popVisible2 = !this.popVisible2;
    },
    /**
     * 高级搜索-部门节点
     */
        searvhViewHandleNodeClick(data) {
      this.inputDepName = data.name;
      this.pageParams.departmentId = data.id;
      this.popVisible2 = !this.popVisible2;
    },

    /**
     * 上传数据之前操作
     */
    beforeUpload() {
      this.importDataBtnText = "正在导入";
      this.importDataBtnIcon = "el-icon-loading";
      this.importDataDisabled = true;
    },
    /**
     * 上传失败
     */
    onError(err, file, fileList) {
      this.importDataBtnText = "导入数据";
      this.importDataBtnIcon = "el-icon-upload2";
      this.importDataDisabled = false;
    },
    /**
     * 上传成功
     */
    onSuccess(response, file, fileList) {
      this.importDataBtnText = "导入数据";
      this.importDataBtnIcon = "el-icon-upload2";
      this.importDataDisabled = false;
      this.initData();
    },
    /**
     * 根据姓名查询所有人
     */
    searchBrandList() {
      this.pageParams.pageNum = 1;
      this.initData();
    },
    /**
     * 每页多少也有问题
     */
    handleSizeChange(val) {
      this.pageParams.pageNum = 1;
      this.pageParams.pageSize = val;
      console.log(this.pageParams.pageSize);
      this.initData();
    },
    /**
     * 当前页获取有问题
     */
    handleCurrentChange(val) {
      this.pageParams.pageNum = val;
      console.log(this.pageParams.pageNum);
      this.initData();
    },
    /**
     * 初始化数据
     */
    initData() {
      this.loading = true;
      getAllEmpsByQuery(this.pageParams).then((res) => {
        console.log(this.pageParams)
        this.loading = false;
        this.list = res.data.list;
        this.total = res.data.total;
        this.totalPage = res.data.totalPage;
      });
    },
  },
};
</script>

<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>