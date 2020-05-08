<template>
    <div id="appMain">
        <!-- 导航栏 -->
        <navBar></navBar>
        <!-- 内容部分 -->
        <el-container class="common-container">
            <!-- 头部 -->
            <el-header>
                <commonHeader></commonHeader>
            </el-header>
            <!-- 主体内容 -->
            <el-main>
                <div id="divMain">
                    <transition name="fade" mode="out-in">
                        <!-- 动画 -->
                        <router-view></router-view>
                    </transition>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import navBar from "./common/components/nav-bar";
import commonHeader from "./common/components/header";
export default {
    name: 'Main',
    components: {
        navBar,
        commonHeader,
    },
};
</script>
<style lang="scss" scoped>
#appMain {
    height: 100%;
    display: flex; /*设为伸缩容器*/
    flex-flow: row; /*伸缩项目单行排列*/
}
#divMain {
    padding: 20px;
    height: calc(100vh - 120px);
    background-color: #fff;
    overflow-y: scroll;
    overflow: auto;
}
.common-container {
    width: 85%;
}
</style>


