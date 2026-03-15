import {defineStore} from "pinia";
const useStore = defineStore('site', ()=>{
    const currentPage = ref<number>(0)



    return { currentPage }
})

export default useStore