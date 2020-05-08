<template>
    <!-- fragment标签代替template里面必须用一个标签包裹 也可以代替template标签  不然菜单的收起功能不能使用 -->
    <fragment>
        <fragment v-for="(items,index) in navMenus" :key="index">
            <el-menu-item :index="items.path" v-if="items.childs === null">
                <i class="iconfont icon-home"></i>
                <span slot="title">{{$t('menus.'+items.name)}}</span>
            </el-menu-item>
            <el-submenu :index="items.path" v-else>
                <template slot="title">
                    <i class="iconfont icon-home"></i>
                    <span>{{$t('menus.'+items.name)}}</span>
                </template>
                <navMenu :navMenus="items.childs"> </navMenu>
            </el-submenu>
        </fragment>
    </fragment>
</template>
<script>
export default {
    name: 'navMenu',
    props: {
        navMenus: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {

        };
    },
    created() {
    },
    methods: {

    }
};
</script>
<style lang="scss" scoped>
.iconfont {
    font-size: 18px;
    padding-right: 0.1rem;
}
</style>

