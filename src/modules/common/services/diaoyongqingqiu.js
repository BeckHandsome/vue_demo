import { http } from "./api";
export default {
    async systemLoginUser() {
        return await http.get('/system/login_user');
    },
    async parameterDevice(params) {
        return await http.get('/devices/balance', { queryParam: params });
    },
    async parameterDeviceSave(params) {
        return await http.put('/device/:device_id/balance_modify', params.data, { routerParam: params.device_id });
    },
    async throughPowerOutages(id, params) {
        return await http.patch('/rent/power_off/device/:id', params, { routerParam: id });
    },
    async getBuildingsMeterInfo(id,params) {
        return await http.get('/buildings/:id', { routerParam: id,queryParam: params});
    },
    async rentRoom(params) {
        return await http.post('/rent/room', params);
    },
};

// 使用规范