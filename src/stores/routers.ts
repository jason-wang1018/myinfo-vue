import { defineStore } from "pinia";
import  routers from "@r/index";

const rewriteComponent = (name:any) => {
    return () => import(`../views/${name}/index.vue`)
}

const useDynamicRouting = defineStore('dynamicRouting', {
    state: () => ({
        menu: [],
    }),
    actions: {
        //设置菜单
        setMenu(menu: any) {
            this.menu = menu;
        },
        setRouter(router: any) {
            let newRouters = router.map(item => {
                item.component= rewriteComponent(item.component)
                return item
            })
            newRouters.forEach(element => {
                routers.addRoute('layout',element)
            });
        }
    },
    persist: true
})

export default useDynamicRouting;
