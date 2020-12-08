$(function () {
    //设置弹窗
    var layer = layui.layer;
    /* 1.  点击 去注册 切换页面 */
    $('#link_reg').on('click', function () {
        console.log('点击了去注册');
        $('.reg-box').show();
        $('.login-box').hide()
    });
    //点击 去登录 切换页面
    $('#link_login').on('click', function () {
        console.log('点击了去登录');
        $('.reg-box').hide()
        $('.login-box').show();
    });


    /*   2. 自定义表单验证规则 */
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('#form_reg [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    /* 3. 表单的注册功能 */
    $('#form_reg').submit(function (e) {
        console.log('点击了注册按钮');
        e.preventDefault();
        var data = $(this).serialize()
        $.ajax({
            type: "POST", //默认get
            url: "/api/reguser", //默认当前页
            data: data, //格式{key:value}
            success: function (res) { //请求成功回调
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请去登录', function () {
                    $('#link_login').click(); //跳转到登录页面
                })
            },

        })
    });

    /* 4.  表单登录功能 */
    $('#form_login').submit(function (e) {
        console.log('点击了登录按钮');
        e.preventDefault();
        var data = $(this).serialize()
        $.ajax({
            type: "POST", //默认get
            url: "/api/login", //默认当前页
            data: data, //格式{key:value}
            success: function (res) { //请求成功回调
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //把token 保存
                localStorage.setItem('token', res.token)

                layer.msg('登录成功', function () {
                    location.href = 'index.html'
                })
            },

        })
    });
})