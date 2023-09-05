import { defineStore } from "pinia";

const useTable = defineStore('table', {
    state: () => ({
        tableIndex:'0',
        editableTabs: [
        ]
    }),
    actions:{
        addTable(){
            this.editableTabs.push()
        },
        SubTable(index:number){
            this.editableTabs.splice(index,1)
        }
    },
    persist:true

})

export default useTable