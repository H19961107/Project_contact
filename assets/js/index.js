$(function () {
    var layer = layui.layer

    /* 获取用户的基本信息 */
    getuserInfo()



    /* 退出登录 */
    $('#logout').on('click', function () {

        // 询问
        layer.confirm('您确定要退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 清除token
            localStorage.removeItem('token')
            // 跳转到登录页
            location.href = 'login.html'
            layer.close(index);
        });
    })


})

function getuserInfo() {
    $.ajax({
        type: "GET", //默认get
        url: "/my/userinfo", //默认当前页
        //设置请求头  见baseAPI.js  
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) { //请求成功回调
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // console.log(res);
            // 渲染用户的头像和昵称
            renderAvatar(res.data)
        },

        //控制用户的首页访问权限 (见baseAPI.js)
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token'); //清除token
        //         location.href = 'login.html'; //跳转到登录页面
        //     }
        // }, //无论请求是成功还是失败都会执行的回调，常用全局成员的释放，或者页面状态的重置

    })
}

//封装函数 渲染用户的头像和昵称
function renderAvatar(user) {
    // console.log(user);
    //判断用户有没有昵称
    var name = user.nickname || user.username
    // 设置欢迎语
    $('#welcome').html('欢迎' + name)
    //判断用户有没有头像
    if (user.user_pic) {
        //有头像
        $('.layui-nav-img').prop('src', user.user_pic)
        $('.text-avatar').hide();
    } else {
        //没有头像
        var first = name[0]; //获取昵称第一个字母
        first = first.toUpperCase(); //转大写字母
        $('.text-avatar').html(first);
        $('.layui-nav-img').hide();
    }
}