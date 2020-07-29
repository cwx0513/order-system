<template>
  <div class="login-container">
    <el-form ref="form"  :rules="rules" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">商品管理系统</h2>
      <el-form-item label="账号" prop="adminName">
        <el-input v-model="form.adminName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="adminPass">
        <el-input v-model="form.adminPass" type="password"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="submitForm('form')" align='center'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {login,getUserInfo} from '@/api/login.js'
export default {
    data() {
      return {
        form: {
          adminName:'',
          adminPass:'',
        },
        rules:{
          adminName:[
            {
              required:true,message:'账号不能为空',trigger:'blur'
            }
          ],
          adminPass:[
            {
              required:true,message:'密码不能为空',trigger:'blur'
            }
          ]

        }

      }
    },
    methods: {
      submitForm(formName){
        this.$refs[formName].validate(valid =>{
          //console.log(valid)
          if(valid)
          {
            login(this.form).then(response =>{
              const resp=response.data
              // console.log(resp,resp.flag,resp.data.token)
              if(resp=='登录成功')
              {
               this.$message({
                  message:resp,
                   type:'success'
                    })
                    this.$router.push('/home')
              }else if(resp=='用户名错误'){
                 this.$message({
                  message:resp,
                   type:'warning'
                    })
              }else{
                 this.$message({
                  message:resp,
                   type:'error'
                    })
              }
              if(resp.flag)
              {
                getUserInfo(resp.data.token).then(response=>{
                  const respUser=response.data
                  if(respUser.flag)
                  {
                  console.log('userInfo',respUser.data)
                  localStorage.setItem('mxg-msm-user',JSON.stringify(respUser.data))
                  localStorage.setItem('mxg-msm-token',resp.data.token)
                  this.$router.push('/')
                  }else{
                    this.$message({
                  message:respUser.message,
                  type:'warning'
                    })

                  }
                })

              }else{
                this.$message({
                  message:resp.message,
                  type:'warning'
                })


              }
            })
          }
          else
          {
            console.log('验证失败')
            return false

          }
        })
      }
    }
  }
</script>
<style scoped>
.login-form{
  width: 350px;
  background-color:rgba(225,225,225,0.8);
  margin:160px auto;
  padding:28px;
  border-radius: 10px;

}
.login-container{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/123.jpg);
  background-size:100% 100%;
}
.login-title{
  color:#313035;
  text-align: center;
}


</style>