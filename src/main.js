import Vue from "vue";
import App from "./App.vue";
import router from './router/index';
import store from "./store/store";
import axios from 'axios';

// 引入该文件是使用fragment标签代替template里面必须用一个标签包裹 也可以代替template标签
import fragment from 'vue-fragment';
Vue.use(fragment.Plugin);

import ElementUI from 'element-ui';//element-ui组件
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

// 引入jq
import 'jquery';


Vue.config.productionTip = false;

//引入基础样式
import './assets/css/base.scss';

// 引入字体图标样式
import './iconfont/fonts/iconfont.css';

//引入基础公共样式
import './assets/css/common.scss';

// 引入element修改的样式
import './assets/css/element.scss';

// 时间格式化
import moment from 'moment';
// 挂载到vue实例上 我们只需要传入需要格式化的时间即可 默认格式化后的格式YYYY-MM-DD HH:mm:ss 需要更改格式只需在改地方修改，修改后使用到格式化的方法的地方全部都会改变
Vue.prototype.$moment = (param) => moment(param).format('YYYY-MM-DD HH:mm:ss');
// 使用this.$moment("传入格式化的时间")

//vue国际化配置
import VueI18n from 'vue-i18n';
import zh from './locale/lang/zh-CN';
import en from './locale/lang/en-US';
// element的国际化
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

Vue.use(VueI18n);
const messages = {
    zh: { ...zh, ...zhLocale },
    en: { ...en, ...enLocale }
};
const i18n = new VueI18n({
    // 语言标识
    locale: 'zh',
    messages
});
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
});

Vue.prototype.$axios = axios; 

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");
