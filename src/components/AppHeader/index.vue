<template>
    <div class="header">
        <a href="#/">
        <img src="@/assets/logo.png" width="25px" class="logo">
        <span class="company">商品管理系统</span>
        </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
       peter<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command='a'>修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-close" command='b'>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
</template>
<script>
import {logout} from '@/api/login.js'
export default {
    methods:{
        handleCommand(command)
        {
            switch(command)
            {
                case 'a':
                    break;
                case 'b':
                    // logout(localStorage.getItem('mxg-msm-token')).then(response => {
                    //     const resp=response.data
                    //         localStorage.removeItem('mxg-msm-token')
                    //         localStorage.removeItem('mxg-msm-user')
                            this.$router.push('/login')
                            // this.$message({
                            //     message:resp.message,
                            //     type:'warning',
                            //     duration:1000
                            // }
            // })
                    break;
                default:
                    break;
            }
        }

    }
}
</script>
<style scoped>
.header{
    position:absolute;
    line-height:51px;
    top:0px;
    left:0px;
    right:0px;
    background-color:#4ACA6D;
}
.logo{
    vertical-align: middle;
    padding: 0px 10px 0px 40px
}
.company{
    color:white;
    position:absolute;

}
.el-dropdown{
    float: right;
    margin-right: 40px;
}
.el-dropdown-link{
    color:white;
    cursor: pointer;
}

</style>