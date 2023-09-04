import useLayout from '@s/layout'



export default function scroll() {
    // let  time:number | null = null
    window.onresize = (e) => {
        // if(time) return
        setTimeout(()=>{
            // console.log(innerWidth);
            if (innerWidth < 600) {
                const LayoutStore = useLayout()
                LayoutStore.$patch({
                    collapse: true
                })
            }
            if (innerWidth > 900) {
                const LayoutStore = useLayout()
                LayoutStore.$patch({
                    collapse: false
                })
            }
        },1000)

    }
}
