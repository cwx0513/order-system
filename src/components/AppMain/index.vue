<template>
    <div class="main">
<el-breadcrumb v-show="$route.path!=='/home'" separator="/">
  <el-breadcrumb-item class="line">{{$route.meta.title}}</el-breadcrumb-item>
</el-breadcrumb>
        <router-view></router-view>
    </div>
</template>
<style scoped>

.main{
    position:absolute;
    top:50px;
    left:230px;
    right:0px;
    bottom: 0px;
    /*background-color:#990513;*/
    padding:10px;
    overflow-y:auto;
}
.el-breadcrumb{
    height: 10px;
    padding:20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.line{
    border-left: 3px solid green;
    padding-left: 10px;
    
}
</style>