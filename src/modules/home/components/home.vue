<template>
    <div>
        <h1>{{$t('menus.home')}}</h1>
        <h2>{{$moment(new Date())}}</h2>
    </div>
</template>
<script>
export default {
    created() {
        const createTime = new Date();
        console.log( this.$moment(createTime));
    },
};
</script>
