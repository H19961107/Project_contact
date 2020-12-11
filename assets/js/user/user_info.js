// 入口函数
$(function () {
    // 弹层对象
    var layer = layui.layer
    // 表单对象
    var form = layui.form

    /**** 1-获取用户的基本信息 ****/
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res)
                // 判断是否获取成功
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 把用户信息渲染到页面
                // $('[name=username]').val(res.data.username)
                // $('[name=nickname]').val(res.data.nickname)
                // $('[name=email]').val(res.data.email)
                // 表单对象一键赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    /**** 2-增加校验nickname的自定义规则 ****/
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称格式不正确，必须是1-6位的字符'
            }
        }
    })
    /**** 3-完成用户信息的修改 ****/
    // 注册表单提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 收集表单数据
        var data = $(this).serialize();
        // console.log(data)
        // 调接口
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data,
            success: function (res) {
                // console.log(res)
                // 判断是否更新成功
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新成功')
                /**** 更新父页面中的昵称 ****/
                // console.log(window.parent)
                window.parent.getuserInfo()
            }
        })
    })

    /**** 4-重置用户信息 ****/
    $('#btnReset').on('click', function (e) {
        // 阻止默认重置行为
        e.preventDefault()
        // 重新获取和渲染用户信息
        initUserInfo()

    })
})