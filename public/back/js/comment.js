
// 进度条
// NProgress.start();
//  NProgress .set(0.4);
//  setTimeout(() => {
//   NProgress .done();
   
//  }, 500);
 //setTimeout(function() {
   //  // 关闭进度条
   //  NProgress.done();
   //}, 500)

   // 需求: 在第一个ajax请求时, 开启进度条
//       在所有的ajax请求都回来后, 关闭进度条

// ajax全局事件
// .ajaxComplete()  当每个ajax完成时调用,  (不管成功还是失败, 都调用)
// .ajaxSuccess()   当每个ajax成功响应时调用
// .ajaxError()     当每个ajax失败响应时调用
// .ajaxSend()      当每个ajax准备要发送前, 会调用ajaxSend

// .ajaxStart()     当第一个ajax请求发送时调用
// .ajaxStop()      当所有的ajax请求完成时调用
$(document).ajaxStart(function(){
  NProgress.start();
});

$(document).ajaxStop(function(){

  setTimeout(() => {
    NProgress.done();
  }, 500);
})



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
  $('#loginOut').click(function(){

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

  }) 
})