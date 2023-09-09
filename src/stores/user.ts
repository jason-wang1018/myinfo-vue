import { defineStore } from "pinia";

const  userUserInfo =defineStore('UserInfo',{
    state:()=>({
        avatar:'',
        role:'',
        token:'',
        username:'',
        router:[]
    }),
    actions:{
    },

    persist:true
})

export default userUserInfo;
