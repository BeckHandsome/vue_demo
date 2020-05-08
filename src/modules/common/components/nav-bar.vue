<template>
    <div class="nav-bar">
        <div class="nav-bar-menus">
            <div class="nav-bar-header" v-if="!isCollapse">Demo</div>
            <div class="nav-fold">
                <!-- 收起 -->
                <i class=" el-icon-s-fold" @click="fold(true)" v-if="!isCollapse"></i>
                <!-- 展开 -->
                <i class=" el-icon-s-unfold" @click="fold(false)" v-if="isCollapse"></i>
            </div>
            <!-- 增加菜单后需要国际化 -->
            <el-menu :default-active="defaultActvie" :unique-opened="true" :router="route"
                :default-openeds="defaultOpenedsArry" :collapse='isCollapse' :collapse-transition='false'>
                <navMenu :navMenus='menuList'></navMenu>
            </el-menu>
        </div>
        <div class="nav-bar-footer" v-if="!isCollapse">
            1
        </div>
    </div>
</template>

<script>
import navMenu from './nav-menu';

export default {
    name: "navBar",
    components: {
        navMenu
    },
    data() {
        return {
            /**
             * defaultActvie 当前激活菜单的 index
             * defaultOpenedsArry 当前打开的 sub-menu 的 index 的数组
             * route 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
             * 
             * */
            defaultActvie: "",
            route: true,
            defaultOpenedsArry: [],
            isCollapse: false,
            // 这个菜单的是从后台取到的 菜单数据是前台提供给后台的格式加在数据库的
            menuList: [
                {
                    name: "home",
                    path: "/home",
                    icon: "home",
                    childs: null
                },
                {
                    name: "login",
                    path: "/login",
                    icon: "login",
                    childs: [
                        {
                            name: "login1",
                            path: "/login/login1",
                            icon: "login1",
                            childs: null
                        },
                        {
                            name: "login2",
                            path: "/login/login2",
                            icon: "login2",
                            childs: null
                        }
                    ]
                },
                {
                    name: "1",
                    path: "/1",
                    icon: "1",
                    childs: [
                        {
                            name: "2",
                            path: "/1/2",
                            icon: "2",
                            childs: [
                                {
                                    name: "3",
                                    path: "/1/2/3",
                                    icon: "3",
                                    childs: null
                                }
                            ]
                        }
                    ]
                },
            ]
        };
    },
    watch: {
        $route(to) {
            // 路由变化的时候让菜单选中打开没问题
            this.defaultActvie = to.path;
            const path = to.path.split('/').slice(1);
            const pathArr = [];
            let pathStr = '';
            for (const i of path) {
                pathStr += "/" + i;

                pathArr.push(pathStr);

            }
            this.defaultOpenedsArry = pathArr;
        }
    },
    methods: {
        // 展开收起功能
        fold(flag) {
            this.isCollapse = flag;
        }
    },
    mounted() {
        // 强制刷新的时候菜单选中打开没问题
        this.defaultActvie = this.$route.path;
        const path = this.$route.path.split('/').slice(1);
        const pathArr = [];
        let pathStr = '';
        for (const i of path) {
            pathStr += "/" + i;

            pathArr.push(pathStr);

        }
        this.defaultOpenedsArry = pathArr;
    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/variables.scss";

.nav-bar {
    height: 100%;
    background-color: $nav-background-color;
    .nav-fold {
        font-size: 25px;
        color: $nav-text-color;
        text-align: right;
        cursor: pointer;
    }
    .nav-bar-header {
        top: 0.23rem;
        text-align: center;
        font-size: 0.46rem;
        font-family: SourceHanSansCN-Bold;
        font-weight: bold;
        color: #9be6ff;
        height: 10%;
        min-height: 0.56rem;
    }

    .nav-bar-menus {
        overflow-y: auto;
        height: 100%;
    }
    .nav-bar-footer {
        bottom: 0.17rem;
        height: 6%;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: $nav-foot-text-color;
        position: absolute;
        line-height: 0.2rem;
        text-align: center;
        width: $nav-width;
    }
}
</style>

