<template>
    <d2-container>
        <template slot="header">
            <div class="layout_header_plus" @click="add"><i class="fa fa-plus" aria-hidden="true"></i><span>新增</span></div>
        </template>

        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="名称">
                <el-input v-model="searchForm.name" placeholder="分类名称"></el-input>
            </el-form-item>
            <el-form-item label="标识">
                <el-input v-model="searchForm.code" placeholder="分类标识"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchForm.status">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="有效" value="1"></el-option>
                    <el-option label="禁用" value="-1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="dataList" size="small" border style="width: 100%">
            <el-table-column prop="name" label="分类名称"></el-table-column>
            <el-table-column prop="code" label="分类标识"></el-table-column>
            <el-table-column label="创建时间">
                <template scope="scope">
                    {{$utils.formateDate(scope.row.createTime,1)}}
                </template>
            </el-table-column>
            <el-table-column  label="更新时间">
                <template scope="scope">
                    {{$utils.formateDate(scope.row.updateTime,1)}}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template scope="scope">
                    {{scope.row.status>0?'有效':'禁用'}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100px">
                <template scope="scope">
                    <el-button type="text" size="small" @click="change(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="pageSizeChange"
            @current-change="pageChange"
            :current-page="currentPage"
            :page-sizes="[5, 10,15,20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
        </el-pagination>

        <el-dialog
            title="新增商品分类"
            :visible.sync="addDialog">
            <el-form  :model="addForm" ref="addForm" label-width="80px" class="demo-form-inline">
                <el-form-item label="名称"
                      prop="name"
                      :rules="[
                      { required: true, message: '分类名称不为空'},
                    ]"
                >
                    <el-input v-model.trim="addForm.name" placeholder="分类名称" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="标识"
                  prop="code"
                  :rules="[
                  { required: true, message: '分类标识不为空'}
                  ]">
                    <el-input v-model.trim="addForm.code" placeholder="分类标识" style="width:80%"></el-input>
                </el-form-item>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col style="text-align: right">
                        <el-button   @click="addDialog = false">取消</el-button>
                        <el-button type="primary"  @click="saveAdd">保存</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>

        <el-dialog
                title="修改商品分类"
                :visible.sync="changeDialog">
            <el-form  :model="changeForm" ref="changeForm" label-width="80px">
                <el-form-item label="名称"
                      prop="name"
                      :rules="[
                      { required: true, message: '分类名称不为空'},
                    ]">
                    <el-input v-model.trim="changeForm.name" placeholder="分类名称" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="标识"
                  prop="code"
                  :rules="[
                  { required: true, message: '分类标识不为空'}
                  ]">
                    <el-input v-model.trim="changeForm.code" placeholder="分类标识"  style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="changeForm.status">
                        <el-radio :label="1">有效</el-radio>
                        <el-radio :label="-1">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col style="text-align: right">
                        <el-button   @click="changeDialog = false">取消</el-button>
                        <el-button type="primary"  @click="saveChange">保存</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
        <!--<template slot="footer">footer</template>-->
    </d2-container>
</template>

<script>
export default {
    name: 'goodsCategory',
    data () {
      return{
          searchForm:{
            name:'',
            code:'',
            status:'0'
          },
          addForm:{
            name:'',
            code:''
          },
          addDialog: false,
          changeForm:{
              name:'',
              code:'',
              id:'',
              status:''
          },
          changeDialog:false,
          dataList:[],
          totalCount:0,
          currentPage:1,
          pageSize:5
      }
    },
    created () {
        this.getData()
    },
    methods: {
        search (){
          if(this.currentPage != 1){
              this.currentPage = 1
          }  else{
              this.getData()
          }
        },
        async getData () {
            const {name,code,status} = this.searchForm
            const parmas = {
                name: name,
                code: code,
                status: status,
                limit:this.pageSize,
                page:this.currentPage
            }
            const responseData = await this.$http.getCategoryList(parmas)
            this.dataList = responseData.data.data
            this.totalCount = responseData.data.totalCount
        },
        pageSizeChange(val,page){
            this.pageSize = val
            this.getData()
        },
        pageChange(val){
            this.currentPage = val
            this.getData()
        },
        add(){
            this.addDialog = true
            this.$refs.addForm.resetFields()
        },
        saveAdd () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    const {name,code} = this.addForm
                    const parmas = {name,code}
                    this.$http.postAddCategory(parmas)
                    this.getData()
                    this.addDialog = false
                } else {
                    return false;
                }
            });
        },
        change (obj) {
            this.changeDialog = true
            const {name, code, id, status} = obj
            this.changeForm = { name, code, id, status }
        },
        saveChange () {
            this.$refs.changeForm.validate((valid) => {
                if (valid) {
                    const {name,code,id,status} = this.changeForm
                    const parmas = { name, code, id, status }
                    this.$http.postChangeCatePory(parmas)
                    this.getData()
                    this.changeDialog = false
                } else {
                    return false;
                }
            });
        }
    }
}
</script>