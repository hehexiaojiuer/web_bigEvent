$(function(){

    const form =layui.form

    const layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '1-6字符之间';
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:form.val('formUserInfo'),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                initUserInfo();
                return layer.msg('更新用户信息成功')
            }
        })
    })


    initUserInfo();

    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                console.log(res)
                form.val('formUserInfo',res.data)
                //调用父页面的方法
                window.parent.userInfo()
            }
        })
    }

    $('#btn-reset').on('click',function(e){
    e.preventDefault()
    initUserInfo();
    })


})

