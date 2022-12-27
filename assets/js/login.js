$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })



    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })

var form = layui.form
    form.verify({
        pwd:[
         /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
        ],
        repwd:function(value){

            let password = $('.reg-box [name=password]').val()

            if(value!==password){
                return '两次密码不一致'
            }
        }
    })

  const layer = layui.layer
//注册
$('#reg-form').on('submit',function(e){
    console.log(1)
    e.preventDefault();
    $.post('/api/reguser',{username:$('#reg-form [name=user]').val(),password:$('#reg-form [name=password]').val()},function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                $('#link_login').click();
                console.log(12)
    })

})



//登录
$('.login-form').submit(function(e){
    console.log($('.login-form').serialize())
    e.preventDefault()

    $.ajax({
        method:'post',
        url:'/api/login',
        data: $('.login-form').serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            localStorage.setItem('token',res.token)
            location.href = "../../index.html"
        }
    })

})























})