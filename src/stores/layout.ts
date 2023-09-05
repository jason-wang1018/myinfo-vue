import { defineStore } from "pinia";

const useLayout=defineStore('layout',{
    state:()=>({
        breadcrumbs:true,
        collapse:false
    }),
    actions:{
        changeCollapse(state:any){
            state.collapse=!this.collapse
        }
    },
    persist: true,
})

export default useLayout