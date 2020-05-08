<template>
    <router-view v-if="isRouterAlive"></router-view>
</template>
<script>
export default {
    name: 'app',
    /**
      provider/inject：简单的来说就是在父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量。

        需要注意的是这里不论子组件有多深，只要调用了inject那么就可以注入provider中的数据。而不是局限于只能从当前父组件的prop属性来获取数据。
    */ 
    
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            isRouterAlive: true //用于强制刷新当前页面测参数
        };
    },
    methods: {
        reload() {//用于强制刷新当前页面的方法
            this.isRouterAlive = false;
            this.$nextTick( () => {
                this.isRouterAlive = true;
            });
        }
    },  
};
</script>
<style lang="scss">

</style>
