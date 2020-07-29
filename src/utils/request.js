import axios from 'axios'
import { Loading } from 'element-ui';
// Loading.service({target:'body'});

const loading={
    loaingInstance:null,
    open:function(){
        if(this.loaingInstance===null)
        {
        this.loaingInstance=Loading.service({
            target:'.main',
            text:'正在加载中，请您稍等',
            background:'rgba(0,0,0,0.5)'
        })
    }
    },
    close:function(){
        if(this.loaingInstance!==null)
        {
            this.loaingInstance.close()
        }
        this.loaingInstance=null

    }
}


const request =axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
})

request.interceptors.request.use(config =>{
    loading.open()
    return config
},error =>{
    loading.close()
    return Promise.reject(error);
})

request.interceptors.response.use(response =>{
    loading.close()
    return response
},error =>{
    loading.close()
    return Promise.reject(error);
})

//  request.get('/db.json').then( response =>{
//      const data=response.data
//      console.log(data)

//  })

export default request