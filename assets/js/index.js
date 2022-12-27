$(function(){
    userInfo()
})


function userInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        success:function(res){
           if(res.status!==0){
               return layui.layer.msg(res.message)
           }
           renderAvatar(res.data)
        }
    })
}

//渲染用户头像
function renderAvatar(user){
    var name = user.nickname || user.username
    console.log(name)
    $('.userinfo .welcome').html('<span>欢迎&nbsp;&nbsp;'+name+'</span>')

    if(user.user_pic !=null ){

        $('.layui-nav-img').attr('src',user.user_pic)
        $('.text-avatar').hide()
    }else{

        $('.layui-nav-img').hide()

        var first = name[0].toUpperCase();
        $('.text-avatar')
        .html(first)
        .show();
    }

}
const layer = layui.layer

$('#btn-logout').on('click',function(){
    layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
        //do something
        
        localStorage.removeItem("token")
        location.href = "../../login.html"
        layer.close(index);

      });
})