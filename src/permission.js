/*import router from './router.js'
import { getUserInfo } from './api/login.js'

router.beforeEach((to, from, next) => {
    const token=localStorage.getItem('mxg-msm-token')
    if(!token)
    {
        if(to.path!='/login')
        {
            next({path:'/login'})
        }else{
            next()
        }

    }else{
        const userInfo=localStorage.getItem('mxg-msm-user')
        if(userInfo)
        {
            next()
        }else{
            getUserInfo(token).then(response=>{
                const resp=response.data
                if(resp.flag)
                {
                    localStorage.setItem('mxg-msm-user',JSON.stringify(resp.data))
                    next()
                }else{
                    next({path:'/login'})

                }



            })

        }

    }



})*/