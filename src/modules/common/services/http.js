
// eslint-disable-next-line no-param-reassign

import axios from 'axios';

/** http请求类，集成拦截器处理
 * opts = {
 *     baseURL: string  基础URL地址
 *     timeout: number  超时时长（毫秒）
 *     token: string    每次请求携带的Authorization值
 *     requestHandle function(config):config 请求处理函数，返回处理后的config
 *     responseHandle function(response):response 响应处理函数，返回处理后的response
 * }
 */
class Http {
    constructor(opts) {
        const options = Object.assign({
            baseURL: '',
            timeout: 5000,
            requestHandle: null,
            responseHandle: null
        }, opts);

        this.http = axios.create({
            baseURL: options.baseURL,
            timeout: options.timeout
        });

        this.http.interceptors.request.use(
            config => {
                if (options.requestHandle) {
                    config = options.requestHandle(config);
                }
                return config;
            },
            error => {
                return error;
            });

        this.http.interceptors.response.use(
            response => {
                if (options.responseHandle) {
                    response = options.responseHandle(response);
                }
                return Http.parseResponse(response);
            },
            (error) => {
                let response = error.response;
                if (options.responseHandle) {
                    response = options.responseHandle(response, error);
                }
                return Http.parseResponse(response, error);
            });
    }

    /**
     * 解析URL
     * @param url <string> '/aaa/:id'
     * @param routeParam = <object|map> {id: 1234} 将使用此对象的属性值替换url中的参数
     * @param queryParam = <object|map> {name: 'abc', attr: 'def'} url后面的查询参数
     * @returns {string}
     */
    parseUrl(url, { routerParam, queryParam } = { routerParam: null, queryParam: null }) {
        if (routerParam) {
            
            url = url.replace(/:([^/]+)/g, (match, key) => {
                return routerParam[key];
            });
        }
        if (queryParam) {
            const queryStrings = [];
            for (const i in queryParam) {
                queryStrings.push(`${i}=${queryParam[i]}`);
            }
            url += '?' + queryStrings.join('&');
        }
        return url;
    }

    /**
     * 增加请求状态
     * @param response axios response
     * @param error axios error
     * @returns {*}
     */
    static parseResponse(response, error = null) {
        if (response) {
            return {
                status: response.status === 200 || response.status === 201,
                data: response.data
            };
        } else if (error) {
            return {
                status: false,
                data: error.message
            };
        }
    }

    /**
     * GET请求方法
     * @param url <string> '/aaa/:id'
     * @param param <object|map> {
     *     routeParam = {id: 1234} 将使用此对象的属性值替换url中的参数
     *     queryParam = {name: 'abc', attr: 'def'} url后面的查询参数
     * }
     * 解析后的 url = '/aaa/1234?name=abc&attr=def'
     * @returns {Promise<*>}
     */
    get(url, param = null, config = null) {
        if (param) {
            url = this.parseUrl(url, param);
        }
        return this.http.get(url, config);
    }

    post(url, data = null, param = null, config = null) {
        if (param) {
            url = this.parseUrl(url, param);
        }
        return this.http.post(url, data, config);
    }

    put(url, data = null, param = null, config = null) {
        if (param) {
            url = this.parseUrl(url, param);
        }
        return this.http.put(url, data, config);
    }

    patch(url, data = null, param = null, config = null) {
        if (param) {
            url = this.parseUrl(url, param);
        }
        return this.http.patch(url, data, config);
    }

    /**
     * GET请求方法
     * @param url <string> '/aaa/:id'
     * @param param <object|map> {
     *     routeParam = {id: 1234} 将使用此对象的属性值替换url中的参数
     *     queryParam = {name: 'abc', attr: 'def'} url后面的查询参数
     * }
     * 解析后的 url = '/aaa/1234?name=abc&attr=def'
     * @returns {Promise<*>}
     */
    delete(url, param = null, config = null) {
        if (param) {
            url = this.parseUrl(url, param);
        }
        return this.http.delete(url, config);
    }
}


// function plugin(Vue, opts) {
//     if (plugin.installed) {
//         return true;
//     }
//     plugin.installed = true;
//     const http = new Http(opts);
//     Vue.prototype.$http = Vue.$http = http;
// }

export { Http };

// export default plugin;
