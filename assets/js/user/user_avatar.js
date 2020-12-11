$(function () {
    // alert('ok')
    // 弹层对象
    var layer = layui.layer
    /**** 1-初始化裁剪区域 ****/
    // (1)获取裁剪区域的dom元素
    var $image = $('#image')
    // (2)准备配置项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // (3)创建裁剪区域
    $image.cropper(options)

    /* 让用户选择图片文件 */
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    });
    $('#file').change(function () {
        // console.log('点击了上传');
        // 获取文件列表
        var files = this.files
        if (files.length === 0) {
            return;
        }
        var file = files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    });


    /**** 3-单击确定按钮，上传头像 ****/
    $('#btnUpload').click(function (e) {
        // (1)把裁剪的图片转换为base64格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // （2）调接口，上传头像
        $.ajax({
            type: "POST", //默认get
            url: "/my/update/avatar", //默认当前页
            data: {
                avatar: dataURL
            },
            success: function (res) { //请求成功回调
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('上传头像成功', function () {
                    // 更新头像
                    window.parent.getuserInfo()
                })
            },
        })
    });
})