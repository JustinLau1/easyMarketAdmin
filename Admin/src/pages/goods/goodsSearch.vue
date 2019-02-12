<template>
  <d2-container>
    <template slot="header">
      <div class="layout_header_plus" @click="add"><i class="fa fa-plus" aria-hidden="true"></i><span>新增</span></div>
    </template>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="商品分类">
        <el-select v-model="searchForm.categoryId">
          <el-option label="全部" value="0"></el-option>
          <el-option :label="item.name" :value="item.id" v-for="item in categoryList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="searchForm.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status">
          <el-option label="全部" value="0"></el-option>
          <el-option label="已上架" value="1"></el-option>
          <el-option label="已下架" value="-1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="dataList" size="small" border style="width: 100%">
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="categoryName" label="商品类型"></el-table-column>
      <el-table-column prop="imgUrl" label="商品图片" width="100px">
        <template scope="scope">
          <img :src="scope.row.imgUrl" style="width: 100%;height:80px" >
        </template>
      </el-table-column>
      <el-table-column prop="marketPrice" label="市场价">
        <template scope="scope">
          <span style="color: green">￥{{scope.row.marketPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="salePrice" label="销售价">
        <template scope="scope">
          <span style="color: red">￥{{scope.row.salePrice}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalStock" label="库存详情">
        <template scope="scope">
          <span style="color: red">{{scope.row.saleStock}}</span>/{{scope.row.totalStock}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template scope="scope">
          <div v-if="scope.row.status>0">
            <el-tag type="success" size="mini">已上架</el-tag>
            <el-button type="text" size="mini" @click="changeStatus(scope.row)">下架</el-button>
          </div>
          <div v-else>
            <el-tag type="danger" size="mini">已下架</el-tag>
            <el-button type="text" size="mini" @click="changeStatus(scope.row)">上架</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
      title="新增商品"
      :visible.sync="addDialog">
      <el-form  :model="addForm" ref="addForm" label-width="80px" class="demo-form-inline">
        <el-form-item label="商品名称"
            prop="name"
            :rules="[
            { required: true, message: '商品名称不为空'},
          ]"
        >
          <el-input v-model.trim="addForm.name" placeholder="商品名称" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model.trim="addForm.categoryId" placeholder="分类标识" style="width:85%">
              <el-option :label="item.name" :value="item.id" v-for="item in categoryList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门市价"
          prop="marketPrice"
          :rules="[
            { required: true, message: '门市价不能为空'},
            { required: true,  validator: checkPrice, trigger: 'blur' },
          ]"
        >
          <el-input v-model.trim="addForm.marketPrice" placeholder="门市价" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="销售价"
            prop="salePrice"
            :rules="[
              { required: true, message: '销售价不能为空'},
              { required: true,  validator: checkPrice, trigger: 'blur' },
          ]"
        >
          <el-input v-model.trim="addForm.salePrice" placeholder="销售价" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="商品库存"
            prop="totalStock"
            :rules="[
              { required: true, message: '库存不能为空'},
              { required: true,  validator: checkStock, trigger: 'blur' },
          ]"
        >
          <el-input v-model.trim="addForm.totalStock" placeholder="商品库存" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="商品图片"
          prop="imgUrl"
          :rules="[
            { required: true,  validator: checkImg, trigger: 'change' },
          ]"
        >
          <el-upload
                  class="upload-demo"
                  action="/api/v1/uploadImg"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :file-list="addForm.imgList"
                  list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
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
            title="修改商品信息"
            :visible.sync="changeDialog">
      <el-form  :model="changeForm" ref="changeForm" label-width="80px" class="demo-form-inline">
        <el-form-item label="商品名称"
          prop="name"
          :rules="[
            { required: true, message: '商品名称不为空'},
          ]"
        >
          <el-input v-model.trim="changeForm.name" placeholder="商品名称" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model.trim="changeForm.categoryId" placeholder="分类标识" style="width:85%">
            <el-option :label="item.name" :value="item.id" v-for="item in categoryList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门市价"
          prop="marketPrice"
          :rules="[
            { required: true, message: '门市价不能为空'},
            { required: true,  validator: checkPrice, trigger: 'blur' },
          ]"
        >
          <el-input v-model.trim="changeForm.marketPrice" placeholder="门市价" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="销售价"
          prop="salePrice"
          :rules="[
            { required: true, message: '销售价不能为空'},
            { required: true,  validator: checkPrice, trigger: 'blur' },
          ]"
        >
          <el-input v-model.trim="changeForm.salePrice" placeholder="销售价" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="已售数量">
          <el-input v-model.trim="changeForm.saleStock" disabled placeholder="商品库存" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="商品库存"
          prop="totalStock"
          :rules="[
            { required: true, message: '库存不能为空'},
            { required: true,  validator: checkStock, trigger: 'blur' },
          ]"
        >
          <el-input v-model.trim="changeForm.totalStock" placeholder="商品库存" style="width:85%"></el-input>
        </el-form-item>
        <el-form-item label="商品图片"
          prop="imgUrl"
          :rules="[
            { required: true,  validator: checkImg, trigger: 'change' },
          ]"
        >
          <el-upload
                  class="upload-demo"
                  action="/api/v1/uploadImg"
                  :on-success="changeHandleSuccess"
                  :on-remove="changeHandleRemove"
                  :file-list="changeForm.imgList"
                  list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col style="text-align: right">
            <el-button   @click="changeDialog = false">取消</el-button>
            <el-button type="primary"  @click="saveChange">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
export default {
  name: 'goodsSearch',
  created () {
      this.getCategory()
  },
  mounted () {
    this.getData()
  },
  data () {
      return {
          searchForm:{
              categoryId:'0',
              name:'',
              code:'',
              status:'0'
          },
          pageSize:5,
          currentPage:1,
          totalCount:0,
          categoryList:[],
          dataList:[],
          addForm:{
              name:'',
              categoryId:1,
              marketPrice:'',
              salePrice:'',
              imgUrl:'',
              saleStock:0,
              totalStock:'',
              imgList:[]
          },
          addDialog: false,
          changeForm:{
              id:'',
              name:'',
              categoryId:1,
              marketPrice:'',
              salePrice:'',
              imgUrl:'',
              saleStock:'',
              totalStock:'',
              imgList:[]
          },
          changeDialog: false
      }
  },
  methods:{
      checkPrice (rule, value, callback){
          var  reg = /^\d+(?=\.{0,1}\d+$|$)/
          if(reg.test(value)){
              callback()
          }else{
              callback('请输入正确的价格！')
          }
      },
      checkImg (rule, value, callback) {
        if(value==''){
            callback('请上传该商品图片')
        }else{
            callback()
        }
      },
      checkStock (rule,value,callback) {
          var  reg = /(^[1-9]\d*$)/
          if (reg.test(value)){
              callback()
          } else {
              callback('请输入正确的库存！')
          }

      },
      async getCategory () {
        const data = await this.$http.getCategoryList({name:'',code:'',status:1})
          this.categoryList = data.data.data
          this.addForm.categoryId = data.data.data[0].id
      },
      search () {
          if(this.currentPage != 1){
              this.currentPage = 1
          }  else{
              this.getData()
          }
      },
      async getData () {
          const {categoryId,name,status} = this.searchForm
          const parmas = {
              categoryId,
              name,
              status,
              limit:this.pageSize,
              page:this.currentPage
          }
          const responseData = await this.$http.getGoodsList(parmas)
          console.log(responseData)
          this.dataList = responseData.data.data
          this.totalCount = responseData.data.totalCount
      },
      add(){
          this.addDialog = true
          this.$refs.addForm.resetFields()
      },
      saveAdd () {
          this.$refs.addForm.validate((valid) => {
              if (valid) {
                  const {name,categoryId,imgUrl,marketPrice,salePrice,totalStock} = this.addForm
                  const parmas = {name,categoryId,imgUrl,marketPrice,salePrice,totalStock}
                  this.$http.postAddGoods(parmas)
                  this.getData()
                  this.addDialog = false
              } else {
                  return false;
              }
          });
      },
      handleRemove(file, fileList) {
          this.addForm.imgList = fileList
          this.addForm.imgUrl = ''
      },
      handleSuccess(response, file, fileList) {
          this.addForm.imgList.push({url:response.data.pictureUrl})
          this.addForm.imgUrl = response.data.pictureUrl
      },
      changeHandleRemove(file, fileList) {
          this.changeForm.imgList = fileList
          this.changeForm.imgUrl = ''
      },
      changeHandleSuccess(response, file, fileList) {
          this.changeForm.imgList.push({url:response.data.pictureUrl})
          this.changeForm.imgUrl = response.data.pictureUrl
      },
      // 修改商品状态
      changeStatus (item) {
          const confirmStatus = item.status>0?'下架':'上架'
          this.$confirm(`您将${confirmStatus}商品《${item.name}》, 是否继续?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(async () => {
              await this.$http.postUpdateGoodsStatus({id:item.id,status:item.status==1?-1:1})
              this.getData()
          }).catch(() => {
             return
          })
      },
      change (item) {
          this.changeDialog = true
          const imgList = [{url:item.imgUrl}]
          const categoryId = Number(item.categoryId)
          this.changeForm ={...item,imgList,categoryId}
      },
      saveChange () {
          this.$refs.changeForm.validate((valid) => {
              if (valid) {
                  const {name,categoryId,imgUrl,marketPrice,salePrice,totalStock,id} = this.changeForm
                  const parmas = {name,categoryId,imgUrl,marketPrice,salePrice,totalStock,id}
                  this.$http.postChangeGoods(this.changeForm)
                  this.getData()
                  this.changeDialog = false
              } else {
                  return false;
              }
          });
      },
      pageSizeChange(val,page){
          this.pageSize = val
          this.getData()
      },
      pageChange(val){
          this.currentPage = val
          this.getData()
      },
  }
}
</script>
