import Vue from "vue";
import Router from "vue-router";
import Login from './views/login/index.vue'
import Layout from '@/components/Layout.vue'
import Home from './views/home/index.vue'
import Goods from './views/goods/index.vue'
import Tanchu from './views/tanchu/index.vue'

Vue.use(Router);
export default new Router({
    routes:[
        {
            path:'/login',
            name:'login',
            component:Login

        },
        {
            path:'/',
            name:'layout',
            component:Layout,
            redirect:'/home',
            children:[

                {
                    path:'/home',
                    component:Home,
                    meta:{title:'首页'}
                },
                {
                    path:'/goods',
                    component:Goods,
                    meta:{title:'商品信息'}
                },
                {
                    path:'/tanchu',
                    component:Tanchu,
                    meta:{title:'弹出图片'}
                },
            ]


        }




    ]

});
