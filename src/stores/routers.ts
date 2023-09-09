import { defineStore } from "pinia";

const  useDynamicRouting =defineStore('DynamicRouting',{
    state:()=>({
        menu:[]
    }),
    actions:{

        //设置菜单
        setMenu(menu:any){

        }
    },
    persist:true
})

export default useDynamicRouting;
