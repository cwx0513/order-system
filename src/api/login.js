import request from '@/utils/request.js'

export function login(admins){
    console.log(admins)
    return request({
        url:'/admins/selectByName',
        method:'get',
        params:admins
    })
}

export function getUserInfo(token) {
    return request({
        url:`/user/info/${token}`,
        method:'get'
    })
}
export function logout(token) {
    return request({
        url:'/user/logout',
        method:'post',
        data:{
            token:token,
        }
    })
}