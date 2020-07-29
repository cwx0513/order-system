<template>
    <div class="navbar">
           <el-menu
           :router='true'
      :default-active="activerouter"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="white"
      active-text-color="#ffd04b">
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-goods"></i>
        <span slot="title">商品信息</span>
      </el-menu-item>
    </el-menu>
    </div>
</template>
<style scoped>
.navbar{
    position:absolute;
    top:50px;
    left:0px;
    bottom: 0px;
    width:220px;
    background-color:#545c64;
    overflow-y:auto;
}
.el-menu{
    border-right: none
}
</style>
<script>
export default {
  data(){
    return {
    activerouter:''
    }
  },
  mounted() {
    this.activerouter=this.$route.path
  }, 
}
</script>