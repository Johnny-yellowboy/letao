$(function(){

  // 点击的时候让二级菜单隐藏
  $('.classify').click(function(){


    $(this).next().stop().slideToggle();

  });
  // 功能2: 左侧菜单列表切换功能

  $('.icon_l').click(function(){

      // $('.aside').stop().slideToggle();
      $('.aside').toggleClass('hidemeau');
      $('.main').toggleClass("hidemeau");
      $('.topbar').toggleClass("hidemeau");

  });
  // 功能3:退出模态框
  $('.icon_r').click(function(){

    $('#myModal').modal("show");
  });
  // 模态框的按钮点击事件
  $('#loginout').click(function(){

    // 发送ajax给后台
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      datatype:"json",
      success:function(info){
        console.log(info);
        // 判断成功后跳转到登录页
        if(info.success){
          location.href = "login.html";
        }
      }
    });

  });
})