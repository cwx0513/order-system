<template>
    <div>
    <el-form ref="searchForm" :inline="true" :model="searchMap"  style="margin-top:20px">
  <el-form-item label="商品名称:" prop="goodsName">
    <el-input  placeholder="商品名称" v-model="searchMap.goodsName"></el-input>
  </el-form-item>
  <el-form-item label="商品价格:" prop="min">
    <el-input placeholder="最小价格" v-model="searchMap.min"></el-input>
  </el-form-item>
  <el-form-item  label="--">
  </el-form-item>

  <el-form-item  prop="max">
    <el-input placeholder="最大价格" v-model="searchMap.max"></el-input>
  </el-form-item>
  <el-form-item label="商品类型:" prop="goodsType.typeName">
    <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in option1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <div style="width:400px;margin:0 auto">
    <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="searchData">查询</el-button>
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd()">新增</el-button>
    <el-button icon="el-icon-refresh" @click="resetForm('searchForm')">重置</el-button>
    <el-button type="danger" icon="el-icon-delete" @click="handleDelete()">删除</el-button>
    </el-form-item>
  </div>
</el-form>
<el-table
    height="400"
    :data="list"
    id="outTable"
    tooltip-effect="dark"
    style="width:100%"
    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    :row-style="{height:'5px'}"
    border
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="序号" width="50" type="index" align='center'></el-table-column>
    <el-table-column label="商品图片" align='center' prop="goodsImg" width="200">
      <template slot-scope="scope">
        <img :src="getSrc(scope.row.goodsImg)" style="width:60px;height:50px">
      </template>
   </el-table-column>
    <el-table-column label="商品编号" width="100" prop="goodsId" align='center'></el-table-column>
    <el-table-column label="商品名称" width="300" prop="goodsName" align='center'></el-table-column>
    <el-table-column label="商品价格" width="100" prop="goodsPrice" align='center'></el-table-column>
    <el-table-column label="库存数量" width="100" prop="goodsNum" align='center'></el-table-column>
    <el-table-column label="商品类型" width="200" prop="goodsType.typeName" align='center'></el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row.goodsName,scope.row.goodsPrice,scope.row.goodsNum,scope.row.goodsTypeId,scope.row.goodsId)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
 <el-pagination
      prev-text="上一页"
      next-text="下一页"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 3, 5]"
      :page-size="pageSize"
      layout="total, sizes, prev, next, jumper"
      :total="total">
    </el-pagination>
<el-dialog title="添加" :visible.sync="dialogFormVisible" width="400px">
  <el-form
  :rules="rules"
  ref="pojoForm"
  label-width="100px" 
  label-position="right"
  style="width:300px"
   :model="pojo">
    <el-form-item label="商品名称:" prop="goodsName">
      <el-input v-model="pojo.goodsName"></el-input>
    </el-form-item>
    <el-form-item label="商品价格:" prop="goodsPrice">
      <el-input v-model="pojo.goodsPrice" ></el-input>
    </el-form-item>
    <el-form-item label="商品数量:" prop="goodsNum">
      <el-input v-model="pojo.goodsNum" ></el-input>
    </el-form-item>
   <el-form-item label="商品类型:">
    <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in option1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
     <el-form-item label="商品图片:" prop="goodsImg">
<el-upload
  <!-- action="https://jsonplaceholder.typicode.com/posts/"
  class="upload-demo"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="1"
  :on-exceed="handleExceed"
  :file-list="fileList" -->
  >
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
    </el-form-item>
    </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addData('pojoForm')">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="修改" :visible.sync="dialogFormVisible1" width="400px">
  <el-form
  
  ref="pojoForm"
  label-width="100px" 
  label-position="right"
  style="width:300px"
   :model="editArr">
    <el-form-item label="商品名称:" prop="goodsName">
      <el-input v-model="editArr.goodsName"></el-input>
    </el-form-item>
    <el-form-item label="商品价格:" prop="goodsPrice">
      <el-input v-model="editArr.goodsPrice" ></el-input>
    </el-form-item>
    <el-form-item label="商品数量:" prop="goodsNum">
      <el-input v-model="editArr.goodsNum" ></el-input>
    </el-form-item>
   <el-form-item label="商品类型:">
    <el-select v-model="value" placeholder="请选择">
  <el-option
      v-for="item in option1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
     <el-form-item label="商品图片:" prop="goodsImg">
    <el-upload
  <!-- action="https://localhost/d:/"
  class="upload-demo"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="1"
  :on-exceed="handleExceed"
  :file-list="fileList" -->
  >
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
    </el-form-item>
    </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateData('pojoForm')">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
import goodsApi from '@/api/goods.js'
import FileSaver from 'file-saver';
import XLSX from 'xlsx'
export default {
    data(){
        return {
          option1:[
          {
            value:null,
            label:'不限'
          },
          {
            value:'1',
            label:'护肤'
          },
          {
            value:'2',
            label:'个人洗护'
          },
          {
            value:'3',
            label:'健康生活'
          },
          {
            value:'4',
            label:'面部洗护'
          },
          {
            value:'5',
            label:'眼部护理'
          },
          {
            value:'6',
            label:'唇部护理'
          },
          {
            value:'7',
            label:'祛斑祛痘'
          },
          {
            value:'8',
            label:'手足洗护'
          },
          {
            value:'9',
            label:'眼部护理'
          },
          {
            value:'10',
            label:'防晒修复'
          },
          {
            value:'11',
            label:'沐浴护肤'
          },
          {
            value:'12',
            label:'洗发护发'
          },
          {
            value:'13',
            label:'口腔护理'
          },
          {
            value:'14',
            label:'消毒液'
          },
          {
            value:'15',
            label:'洗洁精'
          },
          ],

            bool:false,
            value:"请选择",
            list:[],
            dialogFormVisible:false,  
            dialogFormVisible1:false,
            currentPage:1,
            pageSize:5,
            total:1,
            multipleSelection:[],
            delarr:[],
            searchMap:{
              currentPage:1,
              pageSize:5,
              goodsType:{
                typeName:null
              },
              min:null,
              max:null,
              goodsName:null,
              goodsTypeId:null
            },
            editArr:{
              goodsId:null,
              goodsName:null,
              goodsPrice:null,
              goodsNum:null,
              goodsTypeId:null

            },
            options:[],
                
            pojo:{
              goodsName:null,
              goodsPrice:null,
              goodsNum:null,
              goodsImg:null,
              goodsTypeId:null

            },
            rules:{
            goodsName:[
                {required:true, message: "商品名称不能为空", triggle:"blur"}
            ],
            goodsPrice:[
                {required:true, message: "商品价格不能为空", triggle:"blur"}
            ],
            goodsNum:[
                {required:true, message: "商品数量不能为空", triggle:"blur"}
            ],
            },
            arr:[],
fileList:[]

            
        }
    },

    created(){
        this.fetchData()
        this.getSelect()
    },
    methods:{
      handleSelectionChange(val) {
    this.multipleSelection = val;
},
      getTid(){
        const length = this.multipleSelection.length;
        for (let i = 0; i < length; i++) {
         this.delarr.push(this.multipleSelection[i].goodsId)
        }
  },
            fetchData(){  
              this.bool=false      
            goodsApi.getList(this.currentPage,this.pageSize).then(response=>{
                const resp=response.data
                // console.log(response)
                this.list=resp
                this.total=this.list[0].total
                console.log(resp)

               
            })
        },
        searchData(){
          // this.bool=true
          // this.currentPage=1;
          this.searchMap.goodsTypeId=this.value
          this.searchMap.currentPage=this.currentPage
          this.searchMap.pageSize=this.pageSize
          goodsApi.search(this.searchMap).then(response=>{
                const resp=response.data
                // console.log(resp)
                // this.arr.splice(0,1,resp);
                this.list=resp
                this.total=this.list[0].total
                console.log(resp)
                
                
                

                
          })
        },
        handleDelete()
        {
          this.getTid()
          if(this.delarr.length==0)
          {
            this.$message({
                message:'未选中删除信息',
                type:'error'
              })
          }else{
            this.$confirm('你确认删除吗？','提示',{
                confirmButtonText:"确认",
                cancelButtonText:"取消"
            }).then(()=>{
                goodsApi.deleteByTid(this.delarr).then(response=>{
              const resp=response.data
              this.$message({
                message:resp,
                type:'success'
              })
              this.fetchData()
                // if(resp.flag){
                //     this.fetchData(),
                //     this.$message({
                //         message:resp.message,
                //         type:'success'
                      
                //     })
                // }
            })
        })
      }
      },
      handleAdd(){
        this.dialogFormVisible=true
        this.value="不限"
        this.$nextTick( () =>{
        this.$refs['pojoForm'].resetFields()
        })
        
      },
      addData(formName){
        this.pojo.goodsTypeId=this.value
        console.log(this.pojo.goodsTypeId)
        this.dialogFormVisible=false
        this.$refs[formName].validate(valid=>{
          if(valid)
          {
            goodsApi.add(this.pojo).then(response=>{
              const resp=response.data
                // this.dialogFormVisible=false
                if(resp=='此商品已存在')
                {
               
                this.$message({
                  message:resp,
                  type:'warning'
                })
                }else{
                   this.$message({
                    message:resp,
                  type:'success'
                   })
                }
                this.fetchData()
            })
          }
        })
              

            
      },
      resetForm(formName){
         this.$refs[formName].resetFields()
         this.fetchData()
      },
      handleEdit(goodsName,goodsPrice,goodsNum,goodsTypeId,goodsId)
      {
        this.dialogFormVisible1=true
        this.editArr.goodsName=goodsName
        this.editArr.goodsPrice=goodsPrice
        this.editArr.goodsNum=goodsNum
        this.editArr.goodsImg='pro20'
        this.editArr.goodsId=goodsId
      },
      updateData(formName){
        this.editArr.goodsTypeId=this.value
        this.$refs[formName].validate(valid=>{
          if(valid)
          {
            goodsApi.update(this.editArr).then(response=>{
              const resp=response.data
                this.dialogFormVisible1=false
                this.fetchData()
                this.$message({
                  message:resp,
                  type:'success'
                })
            })
          }else{
            return false
          }
        })
      },  
      getSelect(){
        goodsApi.getSel().then(response=>{
          const resp=response.data
          this.options=resp
        })
      },
      getSrc(id){
        return require('@/assets/'+id+'.png')
      },
      handleSizeChange(val){
        this.pageSize=val
        this.fetchData()

      },
      handleCurrentChange(val){
        this.currentPage=val
        // if(this.bool)
        // {
        // this.searchData()
        // }
        
        if(this.value!='不限'&&this.value!=null)
          this.searchData()
          else if(this.value!='不限'&&this.value==null)
          this.fetchData()
          else{
            this.fetchData()
          }

        }
        
      }
      
      //上传图片


} 


 
</script>