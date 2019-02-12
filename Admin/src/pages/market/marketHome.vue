<template>
    <d2-container>
        <div class="content">
            <div class="mobileH5Layout" v-show="false">
                <el-carousel :interval="1000" arrow="never" height="150px">
                    <el-carousel-item v-for="(item, index) in bannerImgList" :key="item">
                        <img :src="item" class="mobileImg">
                    </el-carousel-item>
                </el-carousel>
                <div class="goodsWare" v-for="item in 3" :key="item">
                    <div class="titleLine">
                        休闲零食
                    </div>
                    <img src="http://img01.bqstatic.com//upload/activity/2017112710015821.png@90Q.png" class="goodsImg">
                    <div class="goodsWareWrap">
                        <div class="goodsWareItem" v-for="item in 3" :key="item">
                            <img src="http://img01.bqstatic.com/upload/goods/000/000/6060/0000006060_88680.jpg@200w_200h_90Q">
                            <div class="foodName">美味鱼仔</div>
                            <div class="foodMsg">
                                <div>15g/袋</div>
                                <div>￥1</div>
                                <div>+</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="formList">
                <div class="formLabel">首页轮播图:</div>
                <div class="formContent">
                    <el-upload
                            class="upload-demo"
                            list-type="picture-card"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="searchForm.bannerImgList">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="homeGoodsWareList">
                    <div class="homeGoodsWareListItem" v-for="item in 4">
                        <div class="formLabel" style="color:red;">推荐商品 {{item}}</div>
                        <div class="formLabel">推荐商品标题</div>
                        <el-input></el-input>
                        <div class="formLabel">推荐商品图片</div>
                        <div class="formContent">
                            <el-upload
                                    class="upload-demo"
                                    list-type="picture"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="searchForm.bannerImgList">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </div>
                        <div class="formLabel">搜索商品</div>
                        <el-input></el-input>
                        <div class="formLabel">已选商品</div>
                        <el-tag closable size="small">ss</el-tag>
                    </div>
                    <div style="padding: 20px;width: 100%;text-align: center">
                        <el-button type="primary">保存</el-button>
                        <el-button type="success">预览</el-button>
                    </div>
                </div>
            </div>
        </div>
    </d2-container>
</template>

<script>
export default {
    name: 'goodsCategory',
    data () {
      return{
        bannerImgList:[
            'http://img01.bqstatic.com//upload/activity/2018051618053240.png@90Q.png',
            'http://img01.bqstatic.com//upload/activity/2018051618053240.png@90Q.png'
        ],
        searchForm:{
            bannerImgList: [
                {url: 'http://img01.bqstatic.com//upload/activity/2018051618053240.png@90Q.png'}
            ],
        }
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
            console.log(responseData)
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
<style scoped>
    .content{
        display: flex;
    }
    .formLabel{
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        font-weight: bolder;
    }
    .homeGoodsWareList{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .homeGoodsWareListItem{
        margin-top: 5px;
        width: 250px;
        padding: 5px 10px;
        box-sizing: border-box;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    }
    .formContent{
        height: auto;
    }
    .formList{
        flex: 1;
        padding: 0 20px;
    }
    .mobileH5Layout{
        width: 320px;
        height: 568px;
        border: 1px skyblue solid;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        overflow: auto;
        transition: all 1s;
    }
    .mobileImg{
        height: 100%;
        width: 100%;
    }
    .goodsWare{
        padding: 2px;
        margin-top: 10px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    }
    .titleLine{
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: red;
        position: relative;
        text-indent: 12px;
        font-weight: bolder;
    }
    .titleLine:after{
        content: '';
        height: 80%;
        width: 10px;
        background: red;
        position: absolute;
        top: 10%;
        left: 0;
    }
    .goodsImg{
        width: 96%;
        height: 80px;
        margin: 0 auto;
        display: block;
    }
    .goodsWareWrap{
        width: 100%;
        height: auto;
        display: flex;
        box-sizing: border-box;
    }
    .goodsWareItem{
        flex: 1;
    }
    .goodsWareItem>img{
        width: 100%;
    }
    .foodName{
        height: 20px;
        font-size: 12px;
        text-align: center;
    }
    .foodMsg{
        height: 40px;
        line-height: 20px;
        font-size: 10px;
        text-indent: 10px;
        position: relative;
    }
    .foodMsg>div:nth-child(1){
        color: gray;
    }
    .foodMsg>div:nth-child(2){
        color: red;
    }
    .foodMsg>div:nth-child(3){
        width: 20px;
        height: 20px;
        color: red;
        line-height: 20px;
        font-size: 20px;
        text-align: center;
        text-indent: 0;
        border-radius: 100%;
        border:1px solid gray;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }

</style>