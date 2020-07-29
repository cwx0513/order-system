import request from '../utils/request'
import qs from 'qs'

export default{
      getList(current,number){
          
        return request({
         url:`/goods/selectAll?current=${current}&number=${number}`,
          method:'get',
        //   params:{
        //       current,
        //       pageSize
        //   }
    })
    },
    getSel(){
        return request({
        url:'/goodsType/selectAll',
        method:'get'
    })
    },

    search(goods)   //
        {
            
            console.log(goods.currentPage)
           console.log(goods.pageSize)
           console.log(goods)
            return request({
                url:`/goods/selectByMany`,
                method:'post',
                data:{
                    goodsTypeId:goods.goodsTypeId,
                    max:goods.max,
                    min:goods.min,
                    goodsName:goods.goodsName,
                    current:goods.currentPage,
                    number:goods.pageSize
                    // current:goods.currentPage,
                    // number:goods.pageSize
                }


            })
        },
    deleteByTid(list){
        console.log(list)        //批量删除
        return request({
            url:`/goods/deleteById`,
            method:'delete',
            data:list
                  //Arr是一个装有被勾选的数据集合
        })
    },
    add(pojo)   //新增
        {
            // console.log(pojo)
            return request({
                url:`/goods/insertGoods`,
                method:'post',
                data:pojo
                // data:{
                //     number:pojo.number,
                //     tname:pojo.tname,
                //     sex:pojo.sex,
                //     wages:pojo.wages,
                //     phone:pojo.phone,
                //     college:pojo.college,
                //     rname:pojo.rname
                // }
                //data是传给后台的数据
        })
    },
    // getByTid(tid){       //修改前获取信息
    //     return request({
    //     url:``,
    //     method:'get',
    // })
    // },
    update(pojo) {
        console.log(pojo)   //修改信息
        return request({
            url:`/goods/updateById`,
            method:'put',
            data:pojo
        })
        
    },
}