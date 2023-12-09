// 作用:判断按钮是否有指定的按钮权限
import { Directive } from "vue";
import { userStore } from "@/store/user";
export const permission:Directive = {
    mounted(el,binding){
        console.log('自定义指令')
        console.log(binding)
        //获取store
        const store = userStore()
        //获取用户的所有权限字段
        const permissoins = store.codeList;
        //获取按钮上的权限
        const {value} = binding;
        //value存在，并且是数组，长度大于0
        if(value && value instanceof Array && value.length >0){
            const permissoinRoles = value;
            //判断按钮上的权限，是否存在
            const hasPermission = permissoins.some((role)=>{
                return permissoinRoles.includes(role)
            })
            //如果不存在按钮权限
            if(!hasPermission){
                //把按钮影藏
                el.style.display = 'none'
            }
        }else{
            throw new Error('need roles! Like v-permission="[\'add\',\'edit\']"')
        }
    }
}