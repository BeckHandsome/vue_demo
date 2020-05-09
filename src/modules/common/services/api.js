import  Http  from './http';

import store from '../../store/store';
import router from '../../router/router';
const http = new Http({
    // 基础URL会拼接到各个请求url前面
    baseURL: "",
    // 请求超时时间
    timeout: "200000",
    // 拦截所有请求，配置headers
    requestHandle(config) {
        const token = sessionStorage.getItem("token");
        const refreshToken = sessionStorage.getItem("refreshToken");
        config.headers["X-Requested-With"] = 'XMLHttpRequest';
        config.headers["Accept"] = "application/json";
        config.headers["Content-Type"] = "application/json; charset=UTF-8";

        if (refreshToken) {
            config.headers["S-RefreshToken"] = refreshToken;
        }
        if (token && token !== 'undefined' && token !== 'null') {
            config.headers["X-Authorization"] = "Bearer " + token;
        }

        return config;
    },
    // 拦截所有响应，统一处理消息
    responseHandle(response,error) {
        if (response) {
            if (response.headers.refreshtoken) {
                sessionStorage.setItem("refreshToken", response.headers.refreshtoken);
                sessionStorage.setItem("token", response.headers.token);
            }
            // 拦截所有未登录请求
            if (response.status === 401) {
                store.dispatch("loginOut");
                // 清空本地存的信息
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userName');
                localStorage.removeItem('dictionaryTypesMenus');
                localStorage.removeItem('language');
                router.push({ path: "/login" });
            }
            return response;
        }
        if(error.toString().indexOf('timeout') > -1) {
            const res = {
                data: {
                    Code: '500002',
                    Msg: 'timeout'
                }
            };
            return res;
        }
        const res = {
            data: {
                Code: '500001',
                Msg: 'Server error'
            }
        };
        return res;
        
    }
});
export default http;