/**
 * Created by liyang on 2018/8/13.
 * 接口地址配置文件
 */

export default {
    getHttp(request, tscode, body) {
        window.bridge.callHandler(request, {
            'transcode': tscode,
            'body': body
        }, function(response) {
            if (typeof response == "string") {
                response = JSON.parse(response)
            }
            return response
        })
    },
    getCard() {
        return 15321132121351
    }
}



// MOCK_AUTH_ADMIN = MOCK_AUTH + '/debug';

// 访问接口