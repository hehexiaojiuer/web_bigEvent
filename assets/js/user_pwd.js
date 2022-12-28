
$(function(){

    const form = layui.form
    const layer = layui.layer

    form.verify({
        password:[
            /^[\S]{6,12}/,
            '6-12位不能包含空格'
        ],
        newPwd:function(val){
            let oldPwd = $('.layui-form input[name=oldPwd]').val()
            if(oldPwd === val){
                return '原密码和新密码不能相同'
            }
        },
        rePwd:function(val){
            console.log(val)
            console.log( $('.layui-form  input[name=newPwd]'))
            if(val !== $('.layui-form  input[name=newPwd]').val()){
                return '两次密码不一致'
            }
        }
        
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url:'/my/updatepwd',
            method:'post',
            data:form.val("user-pwd"),
            success:function(res){
                if(res.status !== 0){
                    return '修改密码失败'
                }
                layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })



})

