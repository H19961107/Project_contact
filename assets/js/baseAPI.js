$.ajaxPrefilter(function (options) {
    // 设置请求的跟地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    options.headers = {
        Authorization: localStorage.getItem('token')
    };

    //控制用户在后台页面的访问权限(未登录要跳回登录页)
    options.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token'); //清除token
            location.href = 'login.html'; //跳转到登录页面
        }
    } //无论请求是成功还是失败都会执行的回调，常用全局成员的释放，或者页面状态的重置
})