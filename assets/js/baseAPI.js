$.ajaxPrefilter(function (options) {
    // 设置请求的跟地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    options.headers = {
        Authorization: localStorage.getItem('token')
    };


})