module.exports = {
    //解决跨域问题
    devServer:{
        port:8888,
        host:"localhost",
        https:false,
        open:true,
        proxy:{
            [process.env.VUE_APP_BASE_API]:{
                target:process.env.VUE_APP_SERVICE_URL,
                changeOrigin:true,
                pathRewrite:{
                    ['^'+process.env.VUE_APP_BASE_API]:'',
                }

            }

        }
    },

    lintOnSave:false,
    productionSourceMap:false,
    outputDir:'dist',//构建输出目录
    assetsDir:'static',//静态资源目录(js,css,img,fonts)
    publicPath:'/'

}