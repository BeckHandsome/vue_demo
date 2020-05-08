import { Http } from 'cloudview.ui/lib/utils/http';
import router from '../../router/router';
const http = new Http({
    // 基础URL会拼接到各个请求url前面
    baseURL: SFERE_config.httpPath,
    // 请求超时时间
    timeout: SFERE_config.timeout,
    // 拦截所有请求，配置headers
    requestHandle(config) {
        // 这里需要自己根据登录处理token和请求头

        return config;
    },
    // 拦截所有响应，统一处理消息
    responseHandle(response) {
        if (response) {
            
            // 拦截所有未登录请求
            if (response.status === 401) {
                router.push({ path: "/login" });
            }
            return response;
        }
        const res =  {
            data:{
                Code: '50001',Msg: 'Server error'
            }
        };
        return res;
        
    }
});
export default http;
