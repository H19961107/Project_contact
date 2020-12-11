$(function () {
    // alert('ok')
    // 弹层对象
    var layer = layui.layer
    // 表单对象
    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码格式不正确，必须是6-12位的非空字符'
        ],
        //新旧密码不能一致
        samePwd: function (value) {
            if ($('[name=oldPwd]').val() === value) {
                return '新旧密码不能一致'
            }
        },
        rePwd: function (value) {
            if ($('[name=newPwd]').val() !== value) {
                return '两次密码不一致'
            }
        }
    })

    //完成密码修改
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        console.log('点击了确认密码修改');
        var data = $(this).serialize()
        $.ajax({
            type: "POST", //默认get
            url: "/my/updatepwd", //默认当前页
            data: data, //格式{key:value}
            success: function (res) { //请求成功回调
                console.log(res);
                layer.msg('更新密码成功', function () {
                    //清空密码框
                    $('.layui-form')[0].reset()
                })
            }

        })
    });
})