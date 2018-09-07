import Config from './config.js'

export default {
    //获取用户信息
    getUserInfo() {
        return Config.getHttp('getUserInfo');
    },
    //获取验证码
    getCationCode() {
        return Config.getHttp('serverRequest', 'ucspss100001', {
            'mobile': '18219247733',
            'msgtype': '101132'
        });
    },
    getCard() {
        return Config.getCard()
    }
}