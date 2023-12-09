<template>
  <el-breadcrumb class="bred" separator="/">
    <el-breadcrumb-item v-for="item in tabs">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
 import { onMounted, ref, Ref, watch } from "vue";
import { useRoute,RouteLocationMatched } from 'vue-router';
//当前路由
const route = useRoute()
//定义面包屑导航数据
const tabs : Ref<RouteLocationMatched[]> =  ref([])
//获取面包数据
const getBreadCrumb = ()=>{
    // console.log(route)
    //找出存在title属性的路由数据
    let matched = route.matched.filter((item)=>item.meta && item.meta.title)
    // console.log(matched)
    const first = matched[0]
    if(first.path !=='/dashboard'){
        //构造首页
        matched = [{path:'/dashboard',meta:{title:'首页'}} as any].concat(matched)
    }
    tabs.value = matched;
}
//监听当前路由
watch(
    ()=>route.path,
    ()=>getBreadCrumb()
)
onMounted(()=>{
    getBreadCrumb()
})
</script>

<style scoped lang="scss">
//修改字体颜色
:deep(.el-breadcrumb__inner) {
  color: #fff !important;
}
.bred {
  margin-left: 20px;
}
// 修改字体大小
:deep(.el-breadcrumb__item) {
  font-size: 15px !important;
}
</style>
